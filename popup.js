"use strict";

const SOURCE = "shelly-installer-helper";
const SETTINGS_KEY = "sihSettings";
const DEFAULT_SETTINGS = {
  language: "en"
};
let currentLanguage = "en";

function t(key, replacements) {
  return window.SHELLY_INSTALLER_HELPER_I18N.t(currentLanguage, key, replacements);
}

function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get({ [SETTINGS_KEY]: DEFAULT_SETTINGS }, (items) => {
      resolve({ ...DEFAULT_SETTINGS, ...(items[SETTINGS_KEY] || {}) });
    });
  });
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
}

function setText(id, value) {
  document.getElementById(id).textContent = value || "-";
}

function setMessage(value) {
  document.getElementById("message").textContent = value || "";
}

async function activeTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  return tabs[0] || null;
}

async function sendToActiveTab(type) {
  const tab = await activeTab();
  if (!tab || !tab.id) throw new Error(t("noActiveTab"));
  return chrome.tabs.sendMessage(tab.id, { source: SOURCE, type });
}

function deviceName(state) {
  const info = state && state.deviceInfo;
  if (!info) return "-";
  return info.app || info.type || info.model || info.id || "-";
}

async function refresh() {
  try {
    const state = await sendToActiveTab("GET_PAGE_STATE");
    setText("status", state.active ? `${t("active")} (${state.detection && state.detection.reason || t("detected")})` : t("notActive"));
    setText("host", state.host);
    setText("device", deviceName(state));
  } catch (error) {
    setText("status", t("notAvailableOnPage"));
    setText("host", "-");
    setText("device", "-");
  }
}

document.getElementById("open-helper").addEventListener("click", async () => {
  try {
    await sendToActiveTab("OPEN_HELPER");
    setMessage(t("helperOpened"));
  } catch (error) {
    setMessage(t("helperCannotOpen"));
  }
});

document.getElementById("enable-host").addEventListener("click", async () => {
  try {
    await sendToActiveTab("ENABLE_HOST");
    setMessage(t("helperAlwaysAppear"));
    await refresh();
  } catch (error) {
    setMessage(t("couldNotAllow"));
  }
});

document.getElementById("disable-host").addEventListener("click", async () => {
  try {
    await sendToActiveTab("DISABLE_HOST");
    setMessage(t("helperHiddenHost"));
    await refresh();
  } catch (error) {
    setMessage(t("couldNotBlock"));
  }
});

document.getElementById("open-options").addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

getSettings().then((settings) => {
  currentLanguage = window.SHELLY_INSTALLER_HELPER_I18N.normalizeLanguage(settings.language);
  applyTranslations();
  refresh();
});
