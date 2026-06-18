(() => {
  "use strict";

  const ROOT_ID = "shelly-installer-helper-root";
  const VERSION = "0.1.4";
  const SETTINGS_KEY = "sihSettings";
  const DEFAULT_SETTINGS = {
    autoDetectApi: true,
    autoDetectFingerprint: true,
    autoShowOnShellyAp: true,
    defaultIp: "192.168.1.30",
    allowHosts: [],
    denyHosts: []
  };

  let rootElement = null;
  let state = {
    active: false,
    detection: null,
    deviceInfo: null,
    status: null,
    config: null,
    settings: DEFAULT_SETTINGS,
    lastFocusedUrlField: null
  };

  const DEVICE_CATALOG = Array.isArray(window.SHELLY_INSTALLER_DEVICE_CATALOG)
    ? window.SHELLY_INSTALLER_DEVICE_CATALOG
    : [];

  const modeOptions = {
    "gen2-rgbw": [
      ["light", "Light profile: /light/0..3"],
      ["rgb", "RGB profile: /color/0"],
      ["rgbw", "RGBW profile: /color/0"]
    ],
    "gen1-rgbw2": [
      ["white", "White mode: /white/0..3"],
      ["color", "Color mode: /color/0"]
    ],
    "gen2-light": [["light", "Light component: /light/0.."]],
    "gen1-dimmer": [["white", "Dimmer/light endpoint"]],
    "relay": [["relay", "Relay/Switch: /relay/0.."]],
    "relay-cover": [
      ["switch", "Relay/Switch mode: /relay/0..1"],
      ["cover", "Cover/roller mode: /roller/0"]
    ],
    "cover": [["cover", "Cover/roller endpoint"]],
    "diagnostic": [["diagnostic", "No control URL template"]]
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function storageGet(defaults) {
    return new Promise((resolve) => {
      chrome.storage.local.get(defaults, resolve);
    });
  }

  function storageSet(values) {
    return new Promise((resolve) => {
      chrome.storage.local.set(values, resolve);
    });
  }

  function currentHostKey() {
    return location.origin;
  }

  function normalizeSettings(raw) {
    return { ...DEFAULT_SETTINGS, ...(raw || {}) };
  }

  function escapeText(value) {
    return String(value ?? "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    })[ch]);
  }

  function normalizeHost(value) {
    return String(value || "").trim().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  }

  function withTimeout(fetchPromise, timeoutMs = 1400) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    return fetchPromise(controller.signal).finally(() => clearTimeout(timer));
  }

  async function fetchJson(path, timeoutMs = 1400) {
    const response = await withTimeout((signal) => fetch(path, {
      cache: "no-store",
      credentials: "include",
      signal
    }), timeoutMs);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  function isPrivateishHost(hostname) {
    return /^(192\.168\.|10\.|172\.(1[6-9]|2\d|3[0-1])\.|169\.254\.|127\.|localhost$)/.test(hostname);
  }

  function looksLikeGen1Shelly(data) {
    return !!data && typeof data === "object" && (
      /^SH/.test(String(data.type || "")) ||
      (data.mac && data.fw && Object.prototype.hasOwnProperty.call(data, "auth")) ||
      String(data.type || "").toLowerCase().includes("shelly")
    );
  }

  function looksLikeGen2Shelly(data) {
    return !!data && typeof data === "object" && (
      String(data.id || "").toLowerCase().startsWith("shelly") ||
      String(data.app || "").toLowerCase().includes("shelly") ||
      (Number(data.gen || 0) >= 2 && (data.app || data.model || data.fw_id))
    );
  }

  function fingerprintLooksLikeShelly() {
    const text = [
      document.title,
      document.body ? document.body.innerText.slice(0, 4000) : "",
      Array.from(document.querySelectorAll("a[href], script[src]")).slice(0, 80).map((el) => el.getAttribute("href") || el.getAttribute("src")).join(" ")
    ].join(" ").toLowerCase();
    const strongSignals = ["shelly", "allterco", "#/settings", "/rpc/shelly.getdeviceinfo"];
    return strongSignals.filter((signal) => text.includes(signal)).length >= 2;
  }

  async function detectShelly(settings) {
    const hostKey = currentHostKey();
    if (settings.denyHosts.includes(hostKey)) {
      return { active: false, reason: "denylist" };
    }
    if (settings.allowHosts.includes(hostKey)) {
      return { active: true, reason: "manual allow" };
    }
    if (settings.autoShowOnShellyAp && location.hostname === "192.168.33.1") {
      return { active: true, reason: "Shelly AP address", likely: true };
    }
    if (settings.autoDetectApi) {
      try {
        const gen2Info = await fetchJson("/rpc/Shelly.GetDeviceInfo");
        if (looksLikeGen2Shelly(gen2Info)) {
          return { active: true, reason: "Gen2+ API", generation: "Gen2+", info: gen2Info };
        }
      } catch (error) {
        // Try Gen1 below.
      }
      try {
        const gen1Info = await fetchJson("/shelly");
        if (looksLikeGen1Shelly(gen1Info)) {
          return { active: true, reason: "Gen1 API", generation: "Gen1", info: gen1Info };
        }
      } catch (error) {
        // Fingerprint fallback below.
      }
    }
    if (settings.autoDetectFingerprint && isPrivateishHost(location.hostname) && fingerprintLooksLikeShelly()) {
      return { active: true, reason: "Shelly UI fingerprint", likely: true };
    }
    return { active: false, reason: "no Shelly signal" };
  }

  async function collectDeviceData(detection) {
    const result = { info: detection.info || null, status: null, config: null };
    if (!detection.active) return result;
    if (detection.generation === "Gen2+") {
      result.info = result.info || await fetchJson("/rpc/Shelly.GetDeviceInfo").catch(() => null);
      result.status = await fetchJson("/rpc/Shelly.GetStatus").catch(() => null);
      result.config = await fetchJson("/rpc/Shelly.GetConfig").catch(() => null);
    } else {
      result.info = result.info || await fetchJson("/shelly").catch(() => null);
      result.status = await fetchJson("/status").catch(() => null);
      result.config = await fetchJson("/settings").catch(() => null);
    }
    return result;
  }

  function deviceLabel(info) {
    if (!info) return "Shelly device";
    return info.app || info.type || info.model || info.id || "Shelly device";
  }

  function catalogLabel(entry) {
    const gen = String(entry.generation || "").toUpperCase();
    return `${gen} · ${entry.name} (${entry.model})`;
  }

  function selectedDeviceEntry() {
    const select = rootElement.querySelector('[data-helper="device"]');
    const model = select ? select.value : "";
    return DEVICE_CATALOG.find((entry) => entry.model === model) || null;
  }

  function selectedHelperKind() {
    const entry = selectedDeviceEntry();
    return entry ? entry.helperKind : "diagnostic";
  }

  function liveChannelCountForKind(kind, mode) {
    const status = state.status || {};
    const prefixes = [];
    const usesRelay = kind === "relay" || (kind === "relay-cover" && mode === "switch");
    const usesCover = kind === "cover" || (kind === "relay-cover" && mode === "cover");
    const usesLight = kind === "gen2-light" || (kind === "gen2-rgbw" && mode === "light");
    if (usesRelay) prefixes.push("switch:");
    if (usesLight) prefixes.push("light:");
    if (usesCover) prefixes.push("cover:", "roller:");
    if (Array.isArray(status.relays) && usesRelay) return status.relays.length;
    const ids = Object.keys(status).filter((key) => prefixes.some((prefix) => key.startsWith(prefix)));
    return ids.length;
  }

  function configuredChannelCount(entry, mode) {
    if (!entry) return 0;
    if (entry.modeChannels && Object.prototype.hasOwnProperty.call(entry.modeChannels, mode)) {
      return Math.max(0, Number(entry.modeChannels[mode] || 0));
    }
    return Math.max(0, Number(entry.channelCount || 0));
  }

  function selectedChannelCount() {
    const entry = selectedDeviceEntry();
    const kind = selectedHelperKind();
    const mode = helperValue("mode");
    const liveCount = liveChannelCountForKind(kind, mode);
    if (liveCount > 0) return liveCount;
    return configuredChannelCount(entry, mode);
  }

  function deviceMatchesInfo(entry, info) {
    if (!entry || !info) return false;
    const probes = [
      info.model,
      info.app,
      info.type,
      info.id,
      String(info.id || "").replace(/^shelly/i, "")
    ].filter(Boolean).map((value) => String(value).toLowerCase().replace(/[^a-z0-9]/g, ""));
    const model = String(entry.model || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    const name = String(entry.name || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    return probes.some((probe) => probe === model || probe === name || model.includes(probe) || probe.includes(model));
  }

  function detectedCatalogModel() {
    const info = state.deviceInfo || (state.detection && state.detection.info);
    const match = DEVICE_CATALOG.find((entry) => deviceMatchesInfo(entry, info));
    return match ? match.model : "";
  }

  function renderDeviceOptions() {
    const select = rootElement.querySelector('[data-helper="device"]');
    const previous = select.value;
    const detected = detectedCatalogModel();
    const options = DEVICE_CATALOG.map((entry) => (
      `<option value="${escapeText(entry.model)}">${escapeText(catalogLabel(entry))}</option>`
    )).join("");
    select.innerHTML = options || '<option value="">No device catalog</option>';
    if (detected && [...select.options].some((option) => option.value === detected)) {
      select.value = detected;
    } else if (previous && [...select.options].some((option) => option.value === previous)) {
      select.value = previous;
    }
  }

  function updateChannelOptions() {
    const select = rootElement.querySelector('[data-helper="channel"]');
    const previous = select.value;
    const count = selectedChannelCount();
    if (count <= 0) {
      select.innerHTML = '<option value="0">no channel</option>';
      select.disabled = true;
      return;
    }
    select.innerHTML = Array.from({ length: count }, (_, index) => (
      `<option value="${index}">Channel ${index}</option>`
    )).join("");
    if ([...select.options].some((option) => option.value === previous)) {
      select.value = previous;
    }
    select.disabled = count === 1;
  }

  function helperValue(name) {
    const field = rootElement.querySelector(`[data-helper="${name}"]`);
    return field ? field.value.trim() : "";
  }

  function addParam(params, key, value) {
    if (value === "" || value == null) return;
    params.set(key, value);
  }

  function buildAutomationUrl() {
    const host = normalizeHost(helperValue("ip") || state.settings.defaultIp || location.host);
    const kind = selectedHelperKind();
    const mode = helperValue("mode");
    const channel = Math.max(0, parseInt(helperValue("channel") || "0", 10) || 0);
    const turn = helperValue("turn") || "on";
    const params = new URLSearchParams();
    let path = `/relay/${channel}`;

    if (kind === "diagnostic") {
      return "";
    }
    addParam(params, "turn", turn);
    if (kind === "gen2-rgbw" && mode === "light") {
      path = `/light/${channel}`;
      addParam(params, "brightness", helperValue("brightness"));
    } else if (kind === "gen2-rgbw" && (mode === "rgb" || mode === "rgbw")) {
      path = "/color/0";
      addParam(params, "brightness", helperValue("brightness"));
      addParam(params, "red", helperValue("red"));
      addParam(params, "green", helperValue("green"));
      addParam(params, "blue", helperValue("blue"));
      if (mode === "rgbw") addParam(params, "white", helperValue("white"));
    } else if (kind === "gen1-rgbw2" && mode === "white") {
      path = `/white/${channel}`;
      addParam(params, "brightness", helperValue("brightness"));
    } else if (kind === "gen1-rgbw2" && mode === "color") {
      path = "/color/0";
      addParam(params, "brightness", helperValue("brightness"));
      addParam(params, "red", helperValue("red"));
      addParam(params, "green", helperValue("green"));
      addParam(params, "blue", helperValue("blue"));
      addParam(params, "white", helperValue("white"));
    } else if (kind === "gen2-light") {
      path = `/light/${channel}`;
      addParam(params, "brightness", helperValue("brightness"));
    } else if (kind === "gen1-dimmer") {
      path = `/light/0`;
      addParam(params, "brightness", helperValue("brightness"));
    } else if (kind === "cover" || (kind === "relay-cover" && mode === "cover")) {
      path = `/roller/${channel}`;
      params.delete("turn");
      addParam(params, "go", turn === "off" ? "close" : turn === "toggle" ? "stop" : "open");
    } else {
      path = `/relay/${channel}`;
    }
    addParam(params, "transition", helperValue("transition"));
    addParam(params, "timer", helperValue("timer"));
    return `http://${host}${path}?${params.toString()}`;
  }

  function buildTemplates(url) {
    if (!url) {
      return "This device type does not have a safe control URL template yet. Use the device info and diagnostics section, or choose a relay, light or RGBW device.";
    }
    const escapedUrl = url.replace(/"/g, "\\\"");
    return [
      `Shelly Action URL:\n${url}`,
      "",
      `curl test:\ncurl -sS "${escapedUrl}"`,
      "",
      "Home Assistant REST command:",
      "rest_command:",
      "  shelly_action:",
      `    url: "${escapedUrl}"`
    ].join("\n");
  }

  function setNativeValue(element, value) {
    const prototype = element.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");
    if (descriptor && descriptor.set) descriptor.set.call(element, value);
    else element.value = value;
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function isUrlField(element) {
    if (!element || !["INPUT", "TEXTAREA"].includes(element.tagName)) return false;
    const haystack = [
      element.name,
      element.id,
      element.placeholder,
      element.getAttribute("aria-label"),
      element.closest("label") ? element.closest("label").textContent : ""
    ].join(" ").toLowerCase();
    return /url|uri|endpoint|webhook|address|action/.test(haystack) || element.type === "url";
  }

  function findVisibleUrlField() {
    const fields = Array.from(document.querySelectorAll("input, textarea")).filter((element) => {
      if (rootElement.contains(element)) return false;
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && !element.disabled && !element.readOnly && isUrlField(element);
    });
    return fields.find((field) => !field.value) || fields[0] || null;
  }

  function updateModeOptions() {
    const kind = selectedHelperKind();
    const modeSelect = rootElement.querySelector('[data-helper="mode"]');
    const current = modeSelect.value;
    modeSelect.innerHTML = (modeOptions[kind] || modeOptions.diagnostic).map((item) => `<option value="${item[0]}">${escapeText(item[1])}</option>`).join("");
    if ([...modeSelect.options].some((option) => option.value === current)) modeSelect.value = current;
  }

  function updateVisibility() {
    const kind = selectedHelperKind();
    const mode = helperValue("mode");
    const isColor = (kind === "gen2-rgbw" && (mode === "rgb" || mode === "rgbw")) || (kind === "gen1-rgbw2" && mode === "color");
    const isBrightness = ["gen2-rgbw", "gen1-rgbw2", "gen2-light", "gen1-dimmer"].includes(kind);
    rootElement.querySelector('[data-field="rgb"]').classList.toggle("sih-hidden", !isColor);
    rootElement.querySelector('[data-field="white"]').classList.toggle("sih-hidden", !isColor || mode === "rgb");
    rootElement.querySelector('[data-field="brightness"]').classList.toggle("sih-hidden", !isBrightness);
  }

  function updateGeneratedUrl() {
    updateModeOptions();
    updateChannelOptions();
    updateVisibility();
    const url = buildAutomationUrl();
    rootElement.querySelector('[data-helper="url"]').value = url;
    rootElement.querySelector('[data-helper="url"]').placeholder = url ? "" : "This device does not have a control URL template.";
    rootElement.querySelector('[data-helper="templates"]').textContent = buildTemplates(url);
  }

  function renderInfo() {
    const info = state.deviceInfo;
    const status = state.status || {};
    const config = state.config || {};
    const rows = [
      ["Device", deviceLabel(info)],
      ["Detection", state.detection.reason],
      ["Generation", state.detection.generation || (info && info.gen ? `Gen${info.gen}` : "unknown")],
      ["Firmware", info && (info.ver || info.fw || info.fw_id) || "n/a"],
      ["IP/host", location.host],
      ["Wi-Fi", status.wifi ? `${status.wifi.status || "n/a"} ${status.wifi.ssid || ""}` : "n/a"],
      ["Cloud", status.cloud ? (status.cloud.connected ? "connected" : "disconnected") : "n/a"],
      ["MQTT", status.mqtt ? (status.mqtt.connected ? "connected" : "disconnected") : "n/a"]
    ];
    rootElement.querySelector(".sih-device-info").innerHTML = rows.map(([key, value]) => (
      `<div class="sih-row"><div class="sih-name">${escapeText(key)}</div><div class="sih-meta">${escapeText(value)}</div></div>`
    )).join("");

    const checks = [
      ["Wi-Fi connection verified", !!(status.wifi && (status.wifi.status === "got ip" || status.wifi.sta_ip))],
      ["Firmware version recorded", !!(info && (info.ver || info.fw || info.fw_id))],
      ["Cloud/MQTT set as intended", !!(config.cloud || config.mqtt || status.cloud || status.mqtt)],
      ["Actions/Automations URL tested", false],
      ["Physical channel matches the label", false]
    ];
    rootElement.querySelector(".sih-checklist").innerHTML = checks.map(([label, checked]) => (
      `<li><input type="checkbox" ${checked ? "checked" : ""}><span>${escapeText(label)}</span></li>`
    )).join("");
  }

  function renderRelays() {
    const status = state.status || {};
    const config = state.config || {};
    const relays = [];
    if (Array.isArray(status.relays)) {
      status.relays.forEach((relay, index) => {
        relays.push({
          component: `relay:${index}`,
          label: (config.relays && config.relays[index] && config.relays[index].name) || `Relay ${index}`,
          on: !!relay.ison,
          power: status.meters && status.meters[index] ? status.meters[index].power : 0
        });
      });
    } else {
      Object.keys(status).sort().forEach((key) => {
        if (!key.startsWith("switch:") && !key.startsWith("light:")) return;
        relays.push({
          component: key,
          label: config[key] && config[key].name || key,
          on: !!status[key].output,
          power: status[key].apower || 0
        });
      });
    }
    const target = rootElement.querySelector(".sih-relay-list");
    if (!relays.length) {
      target.innerHTML = '<div class="sih-empty">No relay or light output was found on this page.</div>';
      return;
    }
    target.innerHTML = relays.map((relay) => (
      `<div class="sih-card sih-row">
        <div>
          <div class="sih-name">${escapeText(relay.label)}</div>
          <div class="sih-meta">${escapeText(relay.component)} · ${Number(relay.power || 0).toFixed(1)} W</div>
        </div>
        <div class="sih-badge ${relay.on ? "sih-on" : "sih-off"}">${relay.on ? "ON" : "OFF"}</div>
      </div>`
    )).join("");
  }

  function panelHtml() {
    const defaultIp = state.settings.defaultIp || location.host || "192.168.1.30";
    return `
      <div class="sih-wrap">
        <button class="sih-tab" type="button" aria-label="Open Shelly helper"><span></span></button>
        <aside class="sih-panel" aria-label="Shelly installer helper">
          <div class="sih-head">
            <div>
              <p class="sih-eyebrow">Shelly helper</p>
              <p class="sih-title">Installer control panel</p>
            </div>
          </div>
          <div class="sih-body">
            <button class="sih-tool-button" type="button" data-open-helper>Automation URL helper</button>
            <button class="sih-tool-button" type="button" data-refresh>Refresh device data</button>
            <div class="sih-section-title">Device detection</div>
            <div class="sih-card sih-device-info"><div class="sih-empty">Loading...</div></div>
            <div class="sih-section-title">Current output state</div>
            <div class="sih-relay-list"><div class="sih-empty">Loading state...</div></div>
            <div class="sih-section-title">Installation checklist</div>
            <div class="sih-card"><ul class="sih-checklist"></ul></div>
          </div>
        </aside>
      </div>
      <div class="sih-helper-wrap" aria-hidden="true">
        <aside class="sih-helper-panel" aria-label="Automation URL helper">
          <div class="sih-helper-head">
            <div>
              <p class="sih-eyebrow">Helper</p>
              <p class="sih-title">Automation URL builder</p>
            </div>
            <button class="sih-close" type="button" aria-label="Close helper">×</button>
          </div>
          <div class="sih-helper-body">
            <div class="sih-field">
              <label>Device IP address or hostname</label>
              <input data-helper="ip" type="text" value="${escapeText(defaultIp)}" inputmode="url">
            </div>
            <div class="sih-grid-2">
              <div class="sih-field">
                <label>Device type</label>
                <select data-helper="device"></select>
              </div>
              <div class="sih-field">
                <label>Operating mode</label>
                <select data-helper="mode"></select>
              </div>
            </div>
            <div class="sih-grid-2">
              <div class="sih-field">
                <label>Channel</label>
                <select data-helper="channel"></select>
              </div>
              <div class="sih-field">
                <label>Action</label>
                <select data-helper="turn">
                  <option value="on">Turn on</option>
                  <option value="off">Turn off</option>
                  <option value="toggle">Toggle</option>
                </select>
              </div>
            </div>
            <div class="sih-grid-2">
              <div class="sih-field" data-field="brightness">
                <label>Brightness (%)</label>
                <input data-helper="brightness" type="number" min="0" max="100" value="80">
              </div>
              <div class="sih-field">
                <label>Transition (ms)</label>
                <input data-helper="transition" type="number" min="0" step="100" placeholder="e.g. 500">
              </div>
            </div>
            <div class="sih-grid-2">
              <div class="sih-field">
                <label>Timer / auto-off (s)</label>
                <input data-helper="timer" type="number" min="0" placeholder="optional">
              </div>
              <div class="sih-field" data-field="white">
                <label>White level (0-255)</label>
                <input data-helper="white" type="number" min="0" max="255" value="0">
              </div>
            </div>
            <div class="sih-rgb-fields" data-field="rgb">
              <div class="sih-field"><label>R</label><input data-helper="red" type="number" min="0" max="255" value="255"></div>
              <div class="sih-field"><label>G</label><input data-helper="green" type="number" min="0" max="255" value="0"></div>
              <div class="sih-field"><label>B</label><input data-helper="blue" type="number" min="0" max="255" value="0"></div>
              <div class="sih-field"><label>Profile</label><input type="text" value="RGB/RGBW" disabled></div>
            </div>
            <div class="sih-field">
              <label>Generated URL</label>
              <textarea data-helper="url" readonly></textarea>
            </div>
            <div class="sih-actions">
              <button class="sih-primary-action" type="button" data-insert>Insert into field</button>
              <button class="sih-secondary-action" type="button" data-copy>Copy</button>
            </div>
            <div class="sih-actions">
              <button class="sih-secondary-action" type="button" data-copy-templates>Copy templates</button>
              <button class="sih-secondary-action" type="button" data-run-test>Run URL test</button>
            </div>
            <div class="sih-hint">Click the Automations/Actions URL field first, then open this helper. If no URL field is found, the URL is copied to the clipboard.</div>
            <div class="sih-status" aria-live="polite"></div>
            <div class="sih-section-title">Copyable templates</div>
            <pre class="sih-output" data-helper="templates"></pre>
          </div>
        </aside>
      </div>
    `;
  }

  function setStatus(message) {
    const target = rootElement && rootElement.querySelector(".sih-status");
    if (target) target.textContent = message;
  }

  function setOpen(open) {
    const wrap = rootElement.querySelector(".sih-wrap");
    wrap.classList.toggle("sih-open", open);
    rootElement.querySelector(".sih-tab").setAttribute("aria-label", open ? "Close Shelly helper" : "Open Shelly helper");
    if (open) setHelperOpen(false);
  }

  function setHelperOpen(open) {
    const helper = rootElement.querySelector(".sih-helper-wrap");
    helper.classList.toggle("sih-open", open);
    helper.setAttribute("aria-hidden", open ? "false" : "true");
    if (open) {
      setOpen(false);
      updateGeneratedUrl();
      rootElement.querySelector('[data-helper="ip"]').focus();
    }
  }

  async function copyText(text, okMessage) {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(okMessage);
    } catch (error) {
      setStatus("Clipboard is unavailable. Select the text manually.");
    }
  }

  async function insertUrl() {
    const url = buildAutomationUrl();
    const field = state.lastFocusedUrlField && document.contains(state.lastFocusedUrlField) ? state.lastFocusedUrlField : findVisibleUrlField();
    if (field) {
      field.focus();
      setNativeValue(field, url);
      setStatus("URL inserted into the field.");
      return;
    }
    await copyText(url, "No URL field was found, so the URL was copied to the clipboard.");
  }

  async function runGeneratedUrl() {
    const url = buildAutomationUrl();
    setStatus("Running test URL...");
    try {
      await fetch(url, { mode: "no-cors", cache: "no-store" });
      setStatus("Test request sent. Check the device response.");
    } catch (error) {
      setStatus("The test request did not run. Check the IP address and network.");
    }
  }

  async function refreshDeviceData() {
    const data = await collectDeviceData(state.detection);
    state.deviceInfo = data.info;
    state.status = data.status;
    state.config = data.config;
    if (rootElement) {
      renderDeviceOptions();
      updateGeneratedUrl();
    }
    renderInfo();
    renderRelays();
  }

  function attachEvents() {
    rootElement.querySelector(".sih-tab").addEventListener("click", () => {
      setOpen(!rootElement.querySelector(".sih-wrap").classList.contains("sih-open"));
    });
    rootElement.querySelector("[data-open-helper]").addEventListener("click", () => setHelperOpen(true));
    rootElement.querySelector(".sih-close").addEventListener("click", () => setHelperOpen(false));
    rootElement.querySelector("[data-refresh]").addEventListener("click", () => refreshDeviceData());
    rootElement.querySelectorAll("[data-helper]").forEach((control) => {
      control.addEventListener("input", updateGeneratedUrl);
      control.addEventListener("change", updateGeneratedUrl);
    });
    rootElement.querySelector("[data-copy]").addEventListener("click", () => copyText(buildAutomationUrl(), "URL copied to clipboard."));
    rootElement.querySelector("[data-copy-templates]").addEventListener("click", () => copyText(rootElement.querySelector('[data-helper="templates"]').textContent, "Templates copied to clipboard."));
    rootElement.querySelector("[data-insert]").addEventListener("click", insertUrl);
    rootElement.querySelector("[data-run-test]").addEventListener("click", runGeneratedUrl);
    document.addEventListener("focusin", (event) => {
      if (rootElement && !rootElement.contains(event.target) && isUrlField(event.target)) {
        state.lastFocusedUrlField = event.target;
      }
    }, true);
  }

  function injectUi() {
    if (document.getElementById(ROOT_ID)) return;
    rootElement = document.createElement("div");
    rootElement.id = ROOT_ID;
    rootElement.innerHTML = panelHtml();
    document.documentElement.appendChild(rootElement);
    renderDeviceOptions();
    attachEvents();
    updateGeneratedUrl();
    renderInfo();
    renderRelays();
  }

  function removeUi() {
    const existing = document.getElementById(ROOT_ID);
    if (existing) existing.remove();
    rootElement = null;
  }

  async function setHostPreference(kind) {
    const settings = normalizeSettings((await storageGet({ [SETTINGS_KEY]: DEFAULT_SETTINGS }))[SETTINGS_KEY]);
    const host = currentHostKey();
    settings.allowHosts = settings.allowHosts.filter((item) => item !== host);
    settings.denyHosts = settings.denyHosts.filter((item) => item !== host);
    if (kind === "allow") settings.allowHosts.push(host);
    if (kind === "deny") settings.denyHosts.push(host);
    await storageSet({ [SETTINGS_KEY]: settings });
    state.settings = settings;
  }

  async function bootstrap() {
    const stored = await storageGet({ [SETTINGS_KEY]: DEFAULT_SETTINGS });
    state.settings = normalizeSettings(stored[SETTINGS_KEY]);
    state.detection = await detectShelly(state.settings);
    state.active = !!state.detection.active;
    if (!state.active) return;
    const data = await collectDeviceData(state.detection);
    state.deviceInfo = data.info;
    state.status = data.status;
    state.config = data.config;
    injectUi();
    await sleep(1000);
    refreshDeviceData();
  }

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (!message || message.source !== "shelly-installer-helper") return false;
    if (message.type === "GET_PAGE_STATE") {
      sendResponse({
        active: state.active,
        detection: state.detection,
        deviceInfo: state.deviceInfo,
        host: currentHostKey(),
        version: VERSION
      });
      return false;
    }
    if (message.type === "ENABLE_HOST") {
      setHostPreference("allow").then(async () => {
        state.detection = { active: true, reason: "manual allow" };
        state.active = true;
        injectUi();
        await refreshDeviceData().catch(() => {});
        sendResponse({ ok: true });
      });
      return true;
    }
    if (message.type === "DISABLE_HOST") {
      setHostPreference("deny").then(() => {
        state.active = false;
        removeUi();
        sendResponse({ ok: true });
      });
      return true;
    }
    if (message.type === "OPEN_HELPER") {
      if (!rootElement) injectUi();
      setHelperOpen(true);
      sendResponse({ ok: true });
      return false;
    }
    return false;
  });

  bootstrap();
})();
