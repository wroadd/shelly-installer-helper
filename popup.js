"use strict";

const SOURCE = "shelly-installer-helper";

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
  if (!tab || !tab.id) throw new Error("No active tab.");
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
    setText("status", state.active ? `Active (${state.detection && state.detection.reason || "detected"})` : "Not active");
    setText("host", state.host);
    setText("device", deviceName(state));
  } catch (error) {
    setText("status", "Not available on this page");
    setText("host", "-");
    setText("device", "-");
  }
}

document.getElementById("open-helper").addEventListener("click", async () => {
  try {
    await sendToActiveTab("OPEN_HELPER");
    setMessage("Helper opened on the page.");
  } catch (error) {
    setMessage("The helper cannot be opened on this page.");
  }
});

document.getElementById("enable-host").addEventListener("click", async () => {
  try {
    await sendToActiveTab("ENABLE_HOST");
    setMessage("The helper will always appear on this host.");
    await refresh();
  } catch (error) {
    setMessage("Could not allow this page.");
  }
});

document.getElementById("disable-host").addEventListener("click", async () => {
  try {
    await sendToActiveTab("DISABLE_HOST");
    setMessage("The helper will stay hidden on this host.");
    await refresh();
  } catch (error) {
    setMessage("Could not block this page.");
  }
});

document.getElementById("open-options").addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

refresh();
