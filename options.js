"use strict";

const SETTINGS_KEY = "sihSettings";
const DEFAULT_SETTINGS = {
  autoDetectApi: true,
  autoDetectFingerprint: true,
  autoShowOnShellyAp: true,
  language: "en",
  defaultIp: "192.168.1.30",
  allowHosts: [],
  denyHosts: []
};
let currentLanguage = "en";

function t(key, replacements) {
  return window.SHELLY_INSTALLER_HELPER_I18N.t(currentLanguage, key, replacements);
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.title = t("optionsTitle");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
}

function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.local.get({ [SETTINGS_KEY]: DEFAULT_SETTINGS }, (items) => {
      resolve({ ...DEFAULT_SETTINGS, ...(items[SETTINGS_KEY] || {}) });
    });
  });
}

function saveSettings(settings) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [SETTINGS_KEY]: settings }, resolve);
  });
}

function linesToList(value) {
  return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

function listToLines(value) {
  return (value || []).join("\n");
}

function setMessage(value) {
  document.getElementById("message").textContent = value;
}

async function load() {
  const settings = await getSettings();
  currentLanguage = window.SHELLY_INSTALLER_HELPER_I18N.normalizeLanguage(settings.language);
  const languageSelect = document.getElementById("language");
  languageSelect.innerHTML = window.SHELLY_INSTALLER_HELPER_I18N.languages.map(([code, label]) => (
    `<option value="${code}">${label}</option>`
  )).join("");
  languageSelect.value = currentLanguage;
  applyTranslations();
  document.getElementById("autoDetectApi").checked = !!settings.autoDetectApi;
  document.getElementById("autoDetectFingerprint").checked = !!settings.autoDetectFingerprint;
  document.getElementById("autoShowOnShellyAp").checked = !!settings.autoShowOnShellyAp;
  document.getElementById("defaultIp").value = settings.defaultIp || "";
  document.getElementById("allowHosts").value = listToLines(settings.allowHosts);
  document.getElementById("denyHosts").value = listToLines(settings.denyHosts);
}

async function save() {
  const settings = {
    autoDetectApi: document.getElementById("autoDetectApi").checked,
    autoDetectFingerprint: document.getElementById("autoDetectFingerprint").checked,
    autoShowOnShellyAp: document.getElementById("autoShowOnShellyAp").checked,
    language: document.getElementById("language").value,
    defaultIp: document.getElementById("defaultIp").value.trim() || DEFAULT_SETTINGS.defaultIp,
    allowHosts: linesToList(document.getElementById("allowHosts").value),
    denyHosts: linesToList(document.getElementById("denyHosts").value)
  };
  currentLanguage = window.SHELLY_INSTALLER_HELPER_I18N.normalizeLanguage(settings.language);
  applyTranslations();
  await saveSettings(settings);
  setMessage(t("settingsSaved"));
}

async function reset() {
  await saveSettings(DEFAULT_SETTINGS);
  await load();
  setMessage(t("defaultsRestored"));
}

document.getElementById("save").addEventListener("click", save);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("language").addEventListener("change", () => {
  currentLanguage = window.SHELLY_INSTALLER_HELPER_I18N.normalizeLanguage(document.getElementById("language").value);
  applyTranslations();
});
load();
