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
  if (!tab || !tab.id) throw new Error("Nincs aktív lap.");
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
    setText("status", state.active ? `Aktív (${state.detection && state.detection.reason || "detektált"})` : "Nem aktív");
    setText("host", state.host);
    setText("device", deviceName(state));
  } catch (error) {
    setText("status", "Nem elérhető ezen a lapon");
    setText("host", "-");
    setText("device", "-");
  }
}

document.getElementById("open-helper").addEventListener("click", async () => {
  try {
    await sendToActiveTab("OPEN_HELPER");
    setMessage("Segédlet megnyitva az oldalon.");
  } catch (error) {
    setMessage("A segédlet nem nyitható meg ezen a lapon.");
  }
});

document.getElementById("enable-host").addEventListener("click", async () => {
  try {
    await sendToActiveTab("ENABLE_HOST");
    setMessage("Ezen a hoston mindig megjelenik.");
    await refresh();
  } catch (error) {
    setMessage("Nem sikerült engedélyezni ezen a lapon.");
  }
});

document.getElementById("disable-host").addEventListener("click", async () => {
  try {
    await sendToActiveTab("DISABLE_HOST");
    setMessage("Ezen a hoston nem jelenik meg.");
    await refresh();
  } catch (error) {
    setMessage("Nem sikerült tiltani ezen a lapon.");
  }
});

document.getElementById("open-options").addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});

refresh();
