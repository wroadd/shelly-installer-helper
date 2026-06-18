(() => {
  "use strict";

  const LANGUAGE_OPTIONS = [
    ["en", "English"],
    ["hu", "Magyar"],
    ["cs", "Čeština"],
    ["sl", "Slovenščina"],
    ["sk", "Slovenčina"],
    ["ro", "Română"],
    ["fr", "Français"],
    ["es", "Español"],
    ["de", "Deutsch"],
    ["nl", "Nederlands"],
    ["it", "Italiano"],
    ["sr", "Srpski"],
    ["hr", "Hrvatski"],
    ["pl", "Polski"],
    ["pt", "Português"]
  ];

  const MESSAGES = {
    en: {
      language: "Language",
      popupTitle: "Installer helper",
      status: "Status",
      loading: "Loading...",
      host: "Host",
      device: "Device",
      openUrlHelper: "Open URL helper",
      alwaysShowHere: "Always show here",
      doNotShowHere: "Do not show here",
      settings: "Settings",
      noActiveTab: "No active tab.",
      active: "Active",
      detected: "detected",
      notActive: "Not active",
      notAvailableOnPage: "Not available on this page",
      helperOpened: "Helper opened on the page.",
      helperCannotOpen: "The helper cannot be opened on this page.",
      helperAlwaysAppear: "The helper will always appear on this host.",
      couldNotAllow: "Could not allow this page.",
      helperHiddenHost: "The helper will stay hidden on this host.",
      couldNotBlock: "Could not block this page.",
      optionsTitle: "Shelly Installer Helper settings",
      autoApi: "Automatic Shelly API detection",
      autoAp: "Show automatically on 192.168.33.1",
      autoFingerprint: "HTML/UI fingerprint fallback on private network hosts",
      defaultIp: "Default device IP/host for the URL generator",
      allowedHosts: "Always allowed hosts",
      blockedHosts: "Blocked hosts",
      save: "Save",
      resetDefaults: "Reset defaults",
      settingsSaved: "Settings saved.",
      defaultsRestored: "Default settings restored.",
      lightProfile: "Light profile: /light/0..3",
      rgbProfile: "RGB profile: /color/0",
      rgbwProfile: "RGBW profile: /color/0",
      whiteMode: "White mode: /white/0..3",
      colorMode: "Color mode: /color/0",
      lightComponent: "Light component: /light/0..",
      dimmerEndpoint: "Dimmer/light endpoint",
      relayEndpoint: "Relay/Switch: /relay/0..",
      relaySwitchMode: "Relay/Switch mode: /relay/0..1",
      coverMode: "Cover/roller mode: /roller/0",
      coverEndpoint: "Cover/roller endpoint",
      noControlTemplate: "No control URL template",
      shellyApAddress: "Shelly AP address",
      shellyDevice: "Shelly device",
      noDeviceCatalog: "No device catalog",
      noChannel: "no channel",
      channel: "Channel",
      noSafeTemplate: "This device type does not have a safe control URL template yet. Use the device info and diagnostics section, or choose a relay, light or RGBW device.",
      curlTest: "curl test",
      noDeviceUrlTemplate: "This device does not have a control URL template.",
      detection: "Detection",
      generation: "Generation",
      unknown: "unknown",
      wifiVerified: "Wi-Fi connection verified",
      firmwareRecorded: "Firmware version recorded",
      cloudMqttSet: "Cloud/MQTT set as intended",
      actionUrlTested: "Actions/Automations URL tested",
      physicalChannelMatches: "Physical channel matches the label",
      noOutputFound: "No relay or light output was found on this page.",
      openShellyHelper: "Open Shelly helper",
      closeShellyHelper: "Close Shelly helper",
      shellyInstallerHelper: "Shelly installer helper",
      installerPanel: "Installer control panel",
      automationUrlHelper: "Automation URL helper",
      refreshDeviceData: "Refresh device data",
      deviceDetection: "Device detection",
      outputState: "Current output state",
      loadingState: "Loading state...",
      installationChecklist: "Installation checklist",
      helper: "Helper",
      automationUrlBuilder: "Automation URL builder",
      closeHelper: "Close helper",
      deviceIpHost: "Device IP address or hostname",
      deviceType: "Device type",
      operatingMode: "Operating mode",
      action: "Action",
      turnOn: "Turn on",
      turnOff: "Turn off",
      toggle: "Toggle",
      brightness: "Brightness (%)",
      transition: "Transition (ms)",
      transitionPlaceholder: "e.g. 500",
      timer: "Timer / auto-off (s)",
      optional: "optional",
      whiteLevel: "White level (0-255)",
      profile: "Profile",
      generatedUrl: "Generated URL",
      insertIntoField: "Insert into field",
      copy: "Copy",
      copyTemplates: "Copy templates",
      runUrlTest: "Run URL test",
      helperHint: "Click the Automations/Actions URL field first, then open this helper. If no URL field is found, the URL is copied to the clipboard.",
      copyableTemplates: "Copyable templates",
      clipboardUnavailable: "Clipboard is unavailable. Select the text manually.",
      urlInserted: "URL inserted into the field.",
      noUrlFieldCopied: "No URL field was found, so the URL was copied to the clipboard.",
      runningTestUrl: "Running test URL...",
      testRequestSent: "Test request sent. Check the device response.",
      testRequestFailed: "The test request did not run. Check the IP address and network.",
      urlCopied: "URL copied to clipboard.",
      templatesCopied: "Templates copied to clipboard.",
      homeAssistantRest: "Home Assistant REST command:"
      ,manualAllow: "manual allow"
    },
    hu: {
      language: "Nyelv", popupTitle: "Telepítő segédlet", status: "Állapot", loading: "Betöltés...", host: "Host", device: "Eszköz",
      openUrlHelper: "URL segédlet megnyitása", alwaysShowHere: "Mindig mutasd itt", doNotShowHere: "Ne mutasd itt", settings: "Beállítások",
      noActiveTab: "Nincs aktív lap.", active: "Aktív", detected: "detektált", notActive: "Nem aktív", notAvailableOnPage: "Nem elérhető ezen a lapon",
      helperOpened: "Segédlet megnyitva az oldalon.", helperCannotOpen: "A segédlet nem nyitható meg ezen a lapon.", helperAlwaysAppear: "Ezen a hoston mindig megjelenik.",
      couldNotAllow: "Nem sikerült engedélyezni ezen a lapon.", helperHiddenHost: "Ezen a hoston nem jelenik meg.", couldNotBlock: "Nem sikerült tiltani ezen a lapon.",
      optionsTitle: "Shelly Installer Helper beállítások", autoApi: "Automatikus Shelly API felismerés", autoAp: "Automatikus megjelenés a 192.168.33.1 címen",
      autoFingerprint: "HTML/UI fingerprint fallback belső hálózati címeken", defaultIp: "Alapértelmezett eszköz IP/host az URL generátorban",
      allowedHosts: "Mindig engedélyezett hostok", blockedHosts: "Tiltott hostok", save: "Mentés", resetDefaults: "Alapértelmezés",
      settingsSaved: "Beállítások mentve.", defaultsRestored: "Alapértelmezett beállítások visszaállítva.", lightProfile: "Light profil: /light/0..3",
      rgbProfile: "RGB profil: /color/0", rgbwProfile: "RGBW profil: /color/0", whiteMode: "White mód: /white/0..3", colorMode: "Color mód: /color/0",
      lightComponent: "Light komponens: /light/0..", dimmerEndpoint: "Dimmer/light endpoint", relayEndpoint: "Relay/Switch: /relay/0..",
      relaySwitchMode: "Relay/Switch mód: /relay/0..1", coverMode: "Cover/roller mód: /roller/0", coverEndpoint: "Cover/roller endpoint",
      noControlTemplate: "Nincs vezérlési URL sablon", shellyApAddress: "Shelly AP cím", shellyDevice: "Shelly eszköz", noDeviceCatalog: "Nincs eszközkatalógus",
      noChannel: "nincs csatorna", channel: "Csatorna", noSafeTemplate: "Ehhez az eszköztípushoz még nincs biztonságos vezérlési URL sablon. Használd az eszközadat és diagnosztikai részt, vagy válassz relay/light/RGBW típusú eszközt.",
      curlTest: "curl teszt", noDeviceUrlTemplate: "Ehhez az eszközhöz nincs vezérlési URL sablon.", detection: "Detektálás", generation: "Generáció",
      unknown: "ismeretlen", wifiVerified: "Wi-Fi kapcsolat ellenőrizve", firmwareRecorded: "Firmware verzió felírva", cloudMqttSet: "Cloud/MQTT szándék szerint beállítva",
      actionUrlTested: "Actions/Automations URL tesztelve", physicalChannelMatches: "Fizikai csatorna és felirat egyezik", noOutputFound: "Ehhez az oldalhoz most nem találtam relé vagy light kimenetet.",
      openShellyHelper: "Shelly segédlet megnyitása", closeShellyHelper: "Shelly segédlet bezárása", shellyInstallerHelper: "Shelly telepítő segédlet",
      installerPanel: "Telepítő vezérlőpanel", automationUrlHelper: "Automation URL segédlet", refreshDeviceData: "Eszközadatok frissítése",
      deviceDetection: "Eszköz felismerés", outputState: "Kimenetek pillanatnyi állapota", loadingState: "Állapot betöltése...", installationChecklist: "Telepítési checklist",
      helper: "Segédlet", automationUrlBuilder: "Automation URL kitöltő", closeHelper: "Segédlet bezárása", deviceIpHost: "Eszköz IP címe vagy hostneve",
      deviceType: "Eszköz típus", operatingMode: "Működési mód", action: "Művelet", turnOn: "Bekapcsolás", turnOff: "Kikapcsolás", toggle: "Átváltás",
      brightness: "Fényerő (%)", transition: "Átmenet (ms)", transitionPlaceholder: "pl. 500", timer: "Timer / auto-off (mp)", optional: "opcionális",
      whiteLevel: "Fehér szint (0-255)", profile: "Profil", generatedUrl: "Generált URL", insertIntoField: "Mezőbe illesztés", copy: "Másolás",
      copyTemplates: "Sablonok másolása", runUrlTest: "URL teszt futtatása", helperHint: "Előbb kattints az Automations/Actions URL mezőjébe, utána nyisd meg ezt a segédletet. Ha nem talál URL mezőt, vágólapra másol.",
      copyableTemplates: "Másolható sablonok", clipboardUnavailable: "A vágólap nem érhető el, jelöld ki a szöveget kézzel.", urlInserted: "URL beillesztve a mezőbe.",
      noUrlFieldCopied: "Nem találtam URL mezőt, ezért vágólapra másoltam.", runningTestUrl: "Teszt URL futtatása...", testRequestSent: "Teszt kérés elküldve. Ellenőrizd az eszköz reakcióját.",
      testRequestFailed: "A teszt kérés nem futott le. Ellenőrizd az IP-t és a hálózatot.", urlCopied: "URL vágólapra másolva.", templatesCopied: "Sablonok vágólapra másolva.",
      homeAssistantRest: "Home Assistant REST command:", manualAllow: "kézi engedélyezés"
    },
    cs: {
      language: "Jazyk", popupTitle: "Pomocník instalátora", status: "Stav", loading: "Načítání...", host: "Hostitel", device: "Zařízení", openUrlHelper: "Otevřít URL pomocníka",
      alwaysShowHere: "Vždy zobrazovat zde", doNotShowHere: "Nezobrazovat zde", settings: "Nastavení", noActiveTab: "Žádná aktivní karta.", active: "Aktivní", detected: "detekováno",
      notActive: "Neaktivní", notAvailableOnPage: "Na této stránce není dostupné", helperOpened: "Pomocník byl otevřen na stránce.", helperCannotOpen: "Pomocníka nelze na této stránce otevřít.",
      helperAlwaysAppear: "Pomocník se bude na tomto hostiteli vždy zobrazovat.", couldNotAllow: "Tuto stránku se nepodařilo povolit.", helperHiddenHost: "Pomocník zůstane na tomto hostiteli skrytý.",
      couldNotBlock: "Tuto stránku se nepodařilo zablokovat.", optionsTitle: "Nastavení Shelly Installer Helper", autoApi: "Automatická detekce Shelly API", autoAp: "Automaticky zobrazit na 192.168.33.1",
      autoFingerprint: "HTML/UI fingerprint fallback na privátních síťových hostitelích", defaultIp: "Výchozí IP/host zařízení pro generátor URL", allowedHosts: "Vždy povolení hostitelé", blockedHosts: "Blokovaní hostitelé",
      save: "Uložit", resetDefaults: "Obnovit výchozí", settingsSaved: "Nastavení uloženo.", defaultsRestored: "Výchozí nastavení obnoveno.", channel: "Kanál", noChannel: "žádný kanál",
      shellyDevice: "Zařízení Shelly", noDeviceCatalog: "Žádný katalog zařízení", detection: "Detekce", generation: "Generace", unknown: "neznámé", wifiVerified: "Wi-Fi připojení ověřeno",
      firmwareRecorded: "Verze firmwaru zapsána", cloudMqttSet: "Cloud/MQTT nastaveno podle záměru", actionUrlTested: "URL Actions/Automations otestována", physicalChannelMatches: "Fyzický kanál odpovídá popisku",
      noOutputFound: "Na této stránce nebyl nalezen žádný relay ani light výstup.", installerPanel: "Ovládací panel instalátora", automationUrlHelper: "Pomocník Automation URL",
      refreshDeviceData: "Obnovit data zařízení", deviceDetection: "Detekce zařízení", outputState: "Aktuální stav výstupů", loadingState: "Načítání stavu...", installationChecklist: "Instalační checklist",
      helper: "Pomocník", automationUrlBuilder: "Tvůrce Automation URL", closeHelper: "Zavřít pomocníka", deviceIpHost: "IP adresa nebo hostname zařízení", deviceType: "Typ zařízení",
      operatingMode: "Provozní režim", action: "Akce", turnOn: "Zapnout", turnOff: "Vypnout", toggle: "Přepnout", brightness: "Jas (%)", transition: "Přechod (ms)",
      transitionPlaceholder: "např. 500", timer: "Timer / auto-off (s)", optional: "volitelné", whiteLevel: "Úroveň bílé (0-255)", profile: "Profil", generatedUrl: "Vygenerovaná URL",
      insertIntoField: "Vložit do pole", copy: "Kopírovat", copyTemplates: "Kopírovat šablony", runUrlTest: "Spustit test URL", helperHint: "Nejprve klikněte do pole Automations/Actions URL, potom otevřete pomocníka. Pokud pole URL není nalezeno, URL se zkopíruje do schránky.",
      copyableTemplates: "Kopírovatelné šablony", clipboardUnavailable: "Schránka není dostupná. Vyberte text ručně.", urlInserted: "URL vložena do pole.", noUrlFieldCopied: "Pole URL nebylo nalezeno, URL byla zkopírována do schránky.",
      runningTestUrl: "Spouštění testovací URL...", testRequestSent: "Testovací požadavek odeslán. Zkontrolujte reakci zařízení.", testRequestFailed: "Testovací požadavek se nespustil. Zkontrolujte IP adresu a síť.",
      urlCopied: "URL zkopírována do schránky.", templatesCopied: "Šablony zkopírovány do schránky."
    },
    sl: {
      language: "Jezik", popupTitle: "Pomočnik za monterje", status: "Stanje", loading: "Nalaganje...", host: "Gostitelj", device: "Naprava", openUrlHelper: "Odpri pomočnika za URL",
      alwaysShowHere: "Vedno prikaži tukaj", doNotShowHere: "Ne prikaži tukaj", settings: "Nastavitve", noActiveTab: "Ni aktivnega zavihka.", active: "Aktivno", detected: "zaznano",
      notActive: "Ni aktivno", notAvailableOnPage: "Na tej strani ni na voljo", helperOpened: "Pomočnik je odprt na strani.", helperCannotOpen: "Pomočnika na tej strani ni mogoče odpreti.",
      helperAlwaysAppear: "Pomočnik se bo na tem gostitelju vedno prikazal.", couldNotAllow: "Te strani ni bilo mogoče dovoliti.", helperHiddenHost: "Pomočnik bo na tem gostitelju skrit.",
      couldNotBlock: "Te strani ni bilo mogoče blokirati.", optionsTitle: "Nastavitve Shelly Installer Helper", autoApi: "Samodejno zaznavanje Shelly API", autoAp: "Samodejno prikaži na 192.168.33.1",
      autoFingerprint: "HTML/UI fingerprint fallback na zasebnih omrežnih gostiteljih", defaultIp: "Privzeti IP/gostitelj naprave za generator URL", allowedHosts: "Vedno dovoljeni gostitelji", blockedHosts: "Blokirani gostitelji",
      save: "Shrani", resetDefaults: "Ponastavi privzeto", settingsSaved: "Nastavitve shranjene.", defaultsRestored: "Privzete nastavitve obnovljene.", channel: "Kanal", noChannel: "ni kanala",
      shellyDevice: "Naprava Shelly", noDeviceCatalog: "Ni kataloga naprav", detection: "Zaznavanje", generation: "Generacija", unknown: "neznano", wifiVerified: "Povezava Wi‑Fi preverjena",
      firmwareRecorded: "Različica firmware zapisana", cloudMqttSet: "Cloud/MQTT nastavljen po namenu", actionUrlTested: "URL Actions/Automations preizkušen", physicalChannelMatches: "Fizični kanal se ujema z oznako",
      noOutputFound: "Na tej strani ni bil najden relay ali light izhod.", installerPanel: "Nadzorna plošča monterja", automationUrlHelper: "Pomočnik za Automation URL",
      refreshDeviceData: "Osveži podatke naprave", deviceDetection: "Zaznavanje naprave", outputState: "Trenutno stanje izhodov", loadingState: "Nalaganje stanja...", installationChecklist: "Namestitveni seznam",
      helper: "Pomočnik", automationUrlBuilder: "Gradnik Automation URL", closeHelper: "Zapri pomočnika", deviceIpHost: "IP naslov ali hostname naprave", deviceType: "Tip naprave",
      operatingMode: "Način delovanja", action: "Dejanje", turnOn: "Vklopi", turnOff: "Izklopi", toggle: "Preklopi", brightness: "Svetlost (%)", transition: "Prehod (ms)",
      transitionPlaceholder: "npr. 500", timer: "Timer / auto-off (s)", optional: "neobvezno", whiteLevel: "Nivo bele (0-255)", profile: "Profil", generatedUrl: "Ustvarjen URL",
      insertIntoField: "Vstavi v polje", copy: "Kopiraj", copyTemplates: "Kopiraj predloge", runUrlTest: "Zaženi test URL", helperHint: "Najprej kliknite polje Automations/Actions URL, nato odprite pomočnika. Če polje URL ni najdeno, se URL kopira v odložišče.",
      copyableTemplates: "Kopirljive predloge", clipboardUnavailable: "Odložišče ni na voljo. Besedilo izberite ročno.", urlInserted: "URL vstavljen v polje.", noUrlFieldCopied: "Polje URL ni bilo najdeno, zato je bil URL kopiran v odložišče.",
      runningTestUrl: "Zagon testnega URL...", testRequestSent: "Testna zahteva poslana. Preverite odziv naprave.", testRequestFailed: "Testna zahteva se ni izvedla. Preverite IP naslov in omrežje.",
      urlCopied: "URL kopiran v odložišče.", templatesCopied: "Predloge kopirane v odložišče."
    },
    sk: {
      language: "Jazyk", popupTitle: "Pomocník inštalatéra", status: "Stav", loading: "Načítava sa...", host: "Hostiteľ", device: "Zariadenie", openUrlHelper: "Otvoriť URL pomocníka",
      alwaysShowHere: "Vždy zobrazovať tu", doNotShowHere: "Nezobrazovať tu", settings: "Nastavenia", noActiveTab: "Žiadna aktívna karta.", active: "Aktívne", detected: "detegované",
      notActive: "Neaktívne", notAvailableOnPage: "Na tejto stránke nie je dostupné", helperOpened: "Pomocník otvorený na stránke.", helperCannotOpen: "Pomocníka nemožno na tejto stránke otvoriť.",
      helperAlwaysAppear: "Pomocník sa bude na tomto hostiteľovi vždy zobrazovať.", couldNotAllow: "Túto stránku sa nepodarilo povoliť.", helperHiddenHost: "Pomocník zostane na tomto hostiteľovi skrytý.",
      couldNotBlock: "Túto stránku sa nepodarilo zablokovať.", optionsTitle: "Nastavenia Shelly Installer Helper", autoApi: "Automatická detekcia Shelly API", autoAp: "Automaticky zobraziť na 192.168.33.1",
      autoFingerprint: "HTML/UI fingerprint fallback na súkromných sieťových hostiteľoch", defaultIp: "Predvolená IP/hostiteľ zariadenia pre generátor URL", allowedHosts: "Vždy povolení hostitelia", blockedHosts: "Blokovaní hostitelia",
      save: "Uložiť", resetDefaults: "Obnoviť predvolené", settingsSaved: "Nastavenia uložené.", defaultsRestored: "Predvolené nastavenia obnovené.", channel: "Kanál", noChannel: "žiadny kanál",
      shellyDevice: "Zariadenie Shelly", noDeviceCatalog: "Žiadny katalóg zariadení", detection: "Detekcia", generation: "Generácia", unknown: "neznáme", wifiVerified: "Wi‑Fi pripojenie overené",
      firmwareRecorded: "Verzia firmvéru zapísaná", cloudMqttSet: "Cloud/MQTT nastavené podľa zámeru", actionUrlTested: "URL Actions/Automations otestovaná", physicalChannelMatches: "Fyzický kanál sa zhoduje s popisom",
      noOutputFound: "Na tejto stránke sa nenašiel relay ani light výstup.", installerPanel: "Ovládací panel inštalatéra", automationUrlHelper: "Pomocník Automation URL",
      refreshDeviceData: "Obnoviť údaje zariadenia", deviceDetection: "Detekcia zariadenia", outputState: "Aktuálny stav výstupov", loadingState: "Načítava sa stav...", installationChecklist: "Inštalačný checklist",
      helper: "Pomocník", automationUrlBuilder: "Tvorca Automation URL", closeHelper: "Zavrieť pomocníka", deviceIpHost: "IP adresa alebo hostname zariadenia", deviceType: "Typ zariadenia",
      operatingMode: "Prevádzkový režim", action: "Akcia", turnOn: "Zapnúť", turnOff: "Vypnúť", toggle: "Prepnúť", brightness: "Jas (%)", transition: "Prechod (ms)",
      transitionPlaceholder: "napr. 500", timer: "Timer / auto-off (s)", optional: "voliteľné", whiteLevel: "Úroveň bielej (0-255)", profile: "Profil", generatedUrl: "Vygenerovaná URL",
      insertIntoField: "Vložiť do poľa", copy: "Kopírovať", copyTemplates: "Kopírovať šablóny", runUrlTest: "Spustiť test URL", helperHint: "Najprv kliknite do poľa Automations/Actions URL, potom otvorte pomocníka. Ak sa pole URL nenájde, URL sa skopíruje do schránky.",
      copyableTemplates: "Kopírovateľné šablóny", clipboardUnavailable: "Schránka nie je dostupná. Vyberte text ručne.", urlInserted: "URL vložená do poľa.", noUrlFieldCopied: "Pole URL sa nenašlo, preto bola URL skopírovaná do schránky.",
      runningTestUrl: "Spúšťa sa testovacia URL...", testRequestSent: "Testovacia požiadavka odoslaná. Skontrolujte reakciu zariadenia.", testRequestFailed: "Testovacia požiadavka sa nespustila. Skontrolujte IP adresu a sieť.",
      urlCopied: "URL skopírovaná do schránky.", templatesCopied: "Šablóny skopírované do schránky."
    },
    ro: {
      language: "Limbă", popupTitle: "Asistent instalator", status: "Stare", loading: "Se încarcă...", host: "Gazdă", device: "Dispozitiv", openUrlHelper: "Deschide asistentul URL",
      alwaysShowHere: "Afișează mereu aici", doNotShowHere: "Nu afișa aici", settings: "Setări", noActiveTab: "Nicio filă activă.", active: "Activ", detected: "detectat",
      notActive: "Inactiv", notAvailableOnPage: "Indisponibil pe această pagină", helperOpened: "Asistentul a fost deschis pe pagină.", helperCannotOpen: "Asistentul nu poate fi deschis pe această pagină.",
      helperAlwaysAppear: "Asistentul va apărea mereu pe această gazdă.", couldNotAllow: "Nu s-a putut permite această pagină.", helperHiddenHost: "Asistentul va rămâne ascuns pe această gazdă.",
      couldNotBlock: "Nu s-a putut bloca această pagină.", optionsTitle: "Setări Shelly Installer Helper", autoApi: "Detectare automată Shelly API", autoAp: "Afișare automată pe 192.168.33.1",
      autoFingerprint: "Fallback HTML/UI fingerprint pe gazde din rețea privată", defaultIp: "IP/gazdă implicită pentru generatorul URL", allowedHosts: "Gazde permise mereu", blockedHosts: "Gazde blocate",
      save: "Salvează", resetDefaults: "Resetează implicit", settingsSaved: "Setări salvate.", defaultsRestored: "Setările implicite au fost restaurate.", channel: "Canal", noChannel: "niciun canal",
      shellyDevice: "Dispozitiv Shelly", noDeviceCatalog: "Niciun catalog de dispozitive", detection: "Detectare", generation: "Generație", unknown: "necunoscut", wifiVerified: "Conexiune Wi‑Fi verificată",
      firmwareRecorded: "Versiune firmware notată", cloudMqttSet: "Cloud/MQTT setat conform intenției", actionUrlTested: "URL Actions/Automations testat", physicalChannelMatches: "Canalul fizic corespunde etichetei",
      noOutputFound: "Nu a fost găsită nicio ieșire relay sau light pe această pagină.", installerPanel: "Panou de control instalator", automationUrlHelper: "Asistent Automation URL",
      refreshDeviceData: "Reîmprospătează datele dispozitivului", deviceDetection: "Detectare dispozitiv", outputState: "Starea curentă a ieșirilor", loadingState: "Se încarcă starea...", installationChecklist: "Checklist instalare",
      helper: "Asistent", automationUrlBuilder: "Constructor Automation URL", closeHelper: "Închide asistentul", deviceIpHost: "Adresă IP sau hostname dispozitiv", deviceType: "Tip dispozitiv",
      operatingMode: "Mod de operare", action: "Acțiune", turnOn: "Pornește", turnOff: "Oprește", toggle: "Comută", brightness: "Luminozitate (%)", transition: "Tranziție (ms)",
      transitionPlaceholder: "ex. 500", timer: "Timer / auto-off (s)", optional: "opțional", whiteLevel: "Nivel alb (0-255)", profile: "Profil", generatedUrl: "URL generat",
      insertIntoField: "Inserează în câmp", copy: "Copiază", copyTemplates: "Copiază șabloane", runUrlTest: "Rulează test URL", helperHint: "Mai întâi faceți clic în câmpul Automations/Actions URL, apoi deschideți asistentul. Dacă nu se găsește un câmp URL, URL-ul este copiat în clipboard.",
      copyableTemplates: "Șabloane copiable", clipboardUnavailable: "Clipboard indisponibil. Selectați textul manual.", urlInserted: "URL inserat în câmp.", noUrlFieldCopied: "Nu a fost găsit niciun câmp URL, deci URL-ul a fost copiat în clipboard.",
      runningTestUrl: "Se rulează URL-ul de test...", testRequestSent: "Cerere de test trimisă. Verificați răspunsul dispozitivului.", testRequestFailed: "Cererea de test nu a rulat. Verificați adresa IP și rețeaua.",
      urlCopied: "URL copiat în clipboard.", templatesCopied: "Șabloane copiate în clipboard."
    },
    fr: {
      language: "Langue", popupTitle: "Assistant installateur", status: "État", loading: "Chargement...", host: "Hôte", device: "Appareil", openUrlHelper: "Ouvrir l'assistant URL",
      alwaysShowHere: "Toujours afficher ici", doNotShowHere: "Ne pas afficher ici", settings: "Paramètres", noActiveTab: "Aucun onglet actif.", active: "Actif", detected: "détecté",
      notActive: "Inactif", notAvailableOnPage: "Non disponible sur cette page", helperOpened: "Assistant ouvert sur la page.", helperCannotOpen: "Impossible d'ouvrir l'assistant sur cette page.",
      helperAlwaysAppear: "L'assistant apparaîtra toujours sur cet hôte.", couldNotAllow: "Impossible d'autoriser cette page.", helperHiddenHost: "L'assistant restera masqué sur cet hôte.",
      couldNotBlock: "Impossible de bloquer cette page.", optionsTitle: "Paramètres Shelly Installer Helper", autoApi: "Détection automatique de l'API Shelly", autoAp: "Afficher automatiquement sur 192.168.33.1",
      autoFingerprint: "Fallback fingerprint HTML/UI sur les hôtes réseau privés", defaultIp: "IP/hôte par défaut pour le générateur d'URL", allowedHosts: "Hôtes toujours autorisés", blockedHosts: "Hôtes bloqués",
      save: "Enregistrer", resetDefaults: "Réinitialiser", settingsSaved: "Paramètres enregistrés.", defaultsRestored: "Paramètres par défaut restaurés.", channel: "Canal", noChannel: "aucun canal",
      shellyDevice: "Appareil Shelly", noDeviceCatalog: "Aucun catalogue d'appareils", detection: "Détection", generation: "Génération", unknown: "inconnu", wifiVerified: "Connexion Wi‑Fi vérifiée",
      firmwareRecorded: "Version firmware notée", cloudMqttSet: "Cloud/MQTT configuré comme prévu", actionUrlTested: "URL Actions/Automations testée", physicalChannelMatches: "Le canal physique correspond à l'étiquette",
      noOutputFound: "Aucune sortie relay ou light trouvée sur cette page.", installerPanel: "Panneau de contrôle installateur", automationUrlHelper: "Assistant Automation URL",
      refreshDeviceData: "Actualiser les données appareil", deviceDetection: "Détection appareil", outputState: "État actuel des sorties", loadingState: "Chargement de l'état...", installationChecklist: "Checklist d'installation",
      helper: "Assistant", automationUrlBuilder: "Générateur Automation URL", closeHelper: "Fermer l'assistant", deviceIpHost: "Adresse IP ou nom d'hôte de l'appareil", deviceType: "Type d'appareil",
      operatingMode: "Mode de fonctionnement", action: "Action", turnOn: "Allumer", turnOff: "Éteindre", toggle: "Basculer", brightness: "Luminosité (%)", transition: "Transition (ms)",
      transitionPlaceholder: "ex. 500", timer: "Timer / auto-off (s)", optional: "optionnel", whiteLevel: "Niveau blanc (0-255)", profile: "Profil", generatedUrl: "URL générée",
      insertIntoField: "Insérer dans le champ", copy: "Copier", copyTemplates: "Copier les modèles", runUrlTest: "Lancer le test URL", helperHint: "Cliquez d'abord dans le champ Automations/Actions URL, puis ouvrez cet assistant. Si aucun champ URL n'est trouvé, l'URL est copiée dans le presse-papiers.",
      copyableTemplates: "Modèles copiables", clipboardUnavailable: "Presse-papiers indisponible. Sélectionnez le texte manuellement.", urlInserted: "URL insérée dans le champ.", noUrlFieldCopied: "Aucun champ URL trouvé, l'URL a donc été copiée dans le presse-papiers.",
      runningTestUrl: "Exécution de l'URL de test...", testRequestSent: "Requête de test envoyée. Vérifiez la réaction de l'appareil.", testRequestFailed: "La requête de test n'a pas été exécutée. Vérifiez l'adresse IP et le réseau.",
      urlCopied: "URL copiée dans le presse-papiers.", templatesCopied: "Modèles copiés dans le presse-papiers."
    }
  };

  const compactLanguages = {
    es: ["Idioma", "Ayudante de instalador", "Estado", "Cargando...", "Equipo", "Dispositivo", "Abrir ayudante de URL", "Mostrar siempre aquí", "No mostrar aquí", "Ajustes"],
    de: ["Sprache", "Installationshelfer", "Status", "Wird geladen...", "Host", "Gerät", "URL-Helfer öffnen", "Hier immer anzeigen", "Hier nicht anzeigen", "Einstellungen"],
    nl: ["Taal", "Installatiehulp", "Status", "Laden...", "Host", "Apparaat", "URL-hulp openen", "Hier altijd tonen", "Hier niet tonen", "Instellingen"],
    it: ["Lingua", "Assistente installatore", "Stato", "Caricamento...", "Host", "Dispositivo", "Apri helper URL", "Mostra sempre qui", "Non mostrare qui", "Impostazioni"],
    sr: ["Jezik", "Pomoćnik instalatera", "Status", "Učitavanje...", "Host", "Uređaj", "Otvori URL pomoćnik", "Uvek prikaži ovde", "Ne prikazuj ovde", "Podešavanja"],
    hr: ["Jezik", "Pomoćnik instalatera", "Status", "Učitavanje...", "Host", "Uređaj", "Otvori URL pomoćnik", "Uvijek prikaži ovdje", "Ne prikazuj ovdje", "Postavke"],
    pl: ["Język", "Pomocnik instalatora", "Status", "Ładowanie...", "Host", "Urządzenie", "Otwórz pomocnika URL", "Zawsze pokazuj tutaj", "Nie pokazuj tutaj", "Ustawienia"],
    pt: ["Idioma", "Assistente do instalador", "Estado", "A carregar...", "Host", "Dispositivo", "Abrir assistente de URL", "Mostrar sempre aqui", "Não mostrar aqui", "Definições"]
  };

  const compactMap = ["language", "popupTitle", "status", "loading", "host", "device", "openUrlHelper", "alwaysShowHere", "doNotShowHere", "settings"];
  Object.entries(compactLanguages).forEach(([language, values]) => {
    MESSAGES[language] = { ...MESSAGES.en };
    compactMap.forEach((key, index) => {
      MESSAGES[language][key] = values[index];
    });
  });

  Object.assign(MESSAGES.cs, {
    lightProfile: "Profil světla: /light/0..3", rgbProfile: "RGB profil: /color/0", rgbwProfile: "RGBW profil: /color/0", whiteMode: "Bílý režim: /white/0..3", colorMode: "Barevný režim: /color/0",
    lightComponent: "Komponenta světla: /light/0..", dimmerEndpoint: "Endpoint stmívače/světla", relayEndpoint: "Relé/spínač: /relay/0..", relaySwitchMode: "Režim relé/spínače: /relay/0..1", coverMode: "Režim krytu/rolety: /roller/0",
    coverEndpoint: "Endpoint krytu/rolety", noControlTemplate: "Žádná šablona řídicí URL", shellyApAddress: "Adresa Shelly AP", noSafeTemplate: "Tento typ zařízení zatím nemá bezpečnou šablonu řídicí URL. Použijte část informací a diagnostiky zařízení, nebo vyberte zařízení relay, light nebo RGBW.",
    curlTest: "curl test", noDeviceUrlTemplate: "Toto zařízení nemá šablonu řídicí URL.", openShellyHelper: "Otevřít pomocníka Shelly", closeShellyHelper: "Zavřít pomocníka Shelly", shellyInstallerHelper: "Pomocník instalátora Shelly",
    helper: "Pomocník", closeHelper: "Zavřít pomocníka", copyTemplates: "Kopírovat šablony", copyableTemplates: "Kopírovatelné šablony", homeAssistantRest: "Home Assistant REST příkaz:", manualAllow: "ruční povolení"
  });
  Object.assign(MESSAGES.sl, {
    lightProfile: "Profil luči: /light/0..3", rgbProfile: "RGB profil: /color/0", rgbwProfile: "RGBW profil: /color/0", whiteMode: "Beli način: /white/0..3", colorMode: "Barvni način: /color/0",
    lightComponent: "Komponenta luči: /light/0..", dimmerEndpoint: "Endpoint zatemnilnika/luči", relayEndpoint: "Rele/stikalo: /relay/0..", relaySwitchMode: "Način rele/stikalo: /relay/0..1", coverMode: "Način cover/roleta: /roller/0",
    coverEndpoint: "Endpoint cover/roleta", noControlTemplate: "Ni predloge za krmilni URL", shellyApAddress: "Naslov Shelly AP", noSafeTemplate: "Ta tip naprave še nima varne predloge za krmilni URL. Uporabite razdelek podatkov in diagnostike naprave ali izberite relay, light ali RGBW napravo.",
    curlTest: "curl test", noDeviceUrlTemplate: "Ta naprava nima predloge krmilnega URL.", openShellyHelper: "Odpri Shelly pomočnika", closeShellyHelper: "Zapri Shelly pomočnika", shellyInstallerHelper: "Shelly pomočnik za monterje",
    homeAssistantRest: "Home Assistant REST ukaz:", manualAllow: "ročno dovoljeno"
  });
  Object.assign(MESSAGES.sk, {
    lightProfile: "Profil svetla: /light/0..3", rgbProfile: "RGB profil: /color/0", rgbwProfile: "RGBW profil: /color/0", whiteMode: "Biely režim: /white/0..3", colorMode: "Farebný režim: /color/0",
    lightComponent: "Komponent svetla: /light/0..", dimmerEndpoint: "Endpoint stmievača/svetla", relayEndpoint: "Relé/spínač: /relay/0..", relaySwitchMode: "Režim relé/spínača: /relay/0..1", coverMode: "Režim cover/roleta: /roller/0",
    coverEndpoint: "Endpoint cover/roleta", noControlTemplate: "Žiadna šablóna riadiacej URL", shellyApAddress: "Adresa Shelly AP", noSafeTemplate: "Tento typ zariadenia zatiaľ nemá bezpečnú šablónu riadiacej URL. Použite sekciu informácií a diagnostiky zariadenia alebo vyberte relay, light alebo RGBW zariadenie.",
    curlTest: "curl test", noDeviceUrlTemplate: "Toto zariadenie nemá šablónu riadiacej URL.", openShellyHelper: "Otvoriť pomocníka Shelly", closeShellyHelper: "Zavrieť pomocníka Shelly", shellyInstallerHelper: "Pomocník inštalatéra Shelly",
    homeAssistantRest: "Home Assistant REST príkaz:", manualAllow: "ručné povolenie"
  });
  Object.assign(MESSAGES.ro, {
    lightProfile: "Profil lumină: /light/0..3", rgbProfile: "Profil RGB: /color/0", rgbwProfile: "Profil RGBW: /color/0", whiteMode: "Mod alb: /white/0..3", colorMode: "Mod culoare: /color/0",
    lightComponent: "Componentă lumină: /light/0..", dimmerEndpoint: "Endpoint dimmer/lumină", relayEndpoint: "Releu/comutator: /relay/0..", relaySwitchMode: "Mod releu/comutator: /relay/0..1", coverMode: "Mod cover/rolou: /roller/0",
    coverEndpoint: "Endpoint cover/rolou", noControlTemplate: "Niciun șablon URL de control", shellyApAddress: "Adresă Shelly AP", noSafeTemplate: "Acest tip de dispozitiv nu are încă un șablon sigur pentru URL de control. Folosiți secțiunea de informații și diagnostic sau alegeți un dispozitiv relay, light sau RGBW.",
    curlTest: "test curl", noDeviceUrlTemplate: "Acest dispozitiv nu are șablon URL de control.", openShellyHelper: "Deschide asistentul Shelly", closeShellyHelper: "Închide asistentul Shelly", shellyInstallerHelper: "Asistent instalator Shelly",
    homeAssistantRest: "Comandă REST Home Assistant:", manualAllow: "permis manual"
  });
  Object.assign(MESSAGES.fr, {
    lightProfile: "Profil lumière : /light/0..3", rgbProfile: "Profil RGB : /color/0", rgbwProfile: "Profil RGBW : /color/0", whiteMode: "Mode blanc : /white/0..3", colorMode: "Mode couleur : /color/0",
    lightComponent: "Composant lumière : /light/0..", dimmerEndpoint: "Endpoint variateur/lumière", relayEndpoint: "Relais/interrupteur : /relay/0..", relaySwitchMode: "Mode relais/interrupteur : /relay/0..1", coverMode: "Mode cover/volet : /roller/0",
    coverEndpoint: "Endpoint cover/volet", noControlTemplate: "Aucun modèle d'URL de contrôle", shellyApAddress: "Adresse Shelly AP", noSafeTemplate: "Ce type d'appareil n'a pas encore de modèle d'URL de contrôle sûr. Utilisez la section informations et diagnostic ou choisissez un appareil relay, light ou RGBW.",
    curlTest: "test curl", noDeviceUrlTemplate: "Cet appareil n'a pas de modèle d'URL de contrôle.", openShellyHelper: "Ouvrir l'assistant Shelly", closeShellyHelper: "Fermer l'assistant Shelly", shellyInstallerHelper: "Assistant installateur Shelly",
    homeAssistantRest: "Commande REST Home Assistant :", manualAllow: "autorisation manuelle"
  });

  Object.assign(MESSAGES.es, {
    noActiveTab: "No hay pestaña activa.", active: "Activo", detected: "detectado", notActive: "Inactivo", notAvailableOnPage: "No disponible en esta página", helperOpened: "Ayudante abierto en la página.", helperCannotOpen: "No se puede abrir el ayudante en esta página.",
    helperAlwaysAppear: "El ayudante aparecerá siempre en este host.", couldNotAllow: "No se pudo permitir esta página.", helperHiddenHost: "El ayudante permanecerá oculto en este host.", couldNotBlock: "No se pudo bloquear esta página.",
    optionsTitle: "Ajustes de Shelly Installer Helper", autoApi: "Detección automática de API Shelly", autoAp: "Mostrar automáticamente en 192.168.33.1", autoFingerprint: "Fallback de fingerprint HTML/UI en hosts de red privada", defaultIp: "IP/host predeterminado para el generador de URL",
    allowedHosts: "Hosts siempre permitidos", blockedHosts: "Hosts bloqueados", save: "Guardar", resetDefaults: "Restablecer valores", settingsSaved: "Ajustes guardados.", defaultsRestored: "Valores predeterminados restaurados.",
    lightProfile: "Perfil light: /light/0..3", rgbProfile: "Perfil RGB: /color/0", rgbwProfile: "Perfil RGBW: /color/0", whiteMode: "Modo blanco: /white/0..3", colorMode: "Modo color: /color/0", lightComponent: "Componente light: /light/0..",
    dimmerEndpoint: "Endpoint dimmer/light", relayEndpoint: "Relé/interruptor: /relay/0..", relaySwitchMode: "Modo relé/interruptor: /relay/0..1", coverMode: "Modo cover/persiana: /roller/0", coverEndpoint: "Endpoint cover/persiana",
    noControlTemplate: "Sin plantilla de URL de control", shellyApAddress: "Dirección Shelly AP", shellyDevice: "Dispositivo Shelly", noDeviceCatalog: "Sin catálogo de dispositivos", noChannel: "sin canal", channel: "Canal",
    noSafeTemplate: "Este tipo de dispositivo aún no tiene una plantilla segura de URL de control. Use la sección de información y diagnóstico del dispositivo, o elija un dispositivo relay, light o RGBW.", curlTest: "prueba curl", noDeviceUrlTemplate: "Este dispositivo no tiene plantilla de URL de control.",
    detection: "Detección", generation: "Generación", unknown: "desconocido", wifiVerified: "Conexión Wi‑Fi verificada", firmwareRecorded: "Versión de firmware registrada", cloudMqttSet: "Cloud/MQTT configurado según lo previsto", actionUrlTested: "URL Actions/Automations probada",
    physicalChannelMatches: "El canal físico coincide con la etiqueta", noOutputFound: "No se encontró salida relay ni light en esta página.", openShellyHelper: "Abrir ayudante Shelly", closeShellyHelper: "Cerrar ayudante Shelly", shellyInstallerHelper: "Ayudante de instalación Shelly",
    installerPanel: "Panel de control del instalador", automationUrlHelper: "Ayudante Automation URL", refreshDeviceData: "Actualizar datos del dispositivo", deviceDetection: "Detección del dispositivo", outputState: "Estado actual de salidas", loadingState: "Cargando estado...", installationChecklist: "Checklist de instalación",
    helper: "Ayudante", automationUrlBuilder: "Constructor de Automation URL", closeHelper: "Cerrar ayudante", deviceIpHost: "IP o hostname del dispositivo", deviceType: "Tipo de dispositivo", operatingMode: "Modo de operación", action: "Acción", turnOn: "Encender", turnOff: "Apagar",
    toggle: "Alternar", brightness: "Brillo (%)", transition: "Transición (ms)", transitionPlaceholder: "p. ej. 500", timer: "Temporizador / auto-off (s)", optional: "opcional", whiteLevel: "Nivel de blanco (0-255)", profile: "Perfil", generatedUrl: "URL generada",
    insertIntoField: "Insertar en el campo", copy: "Copiar", copyTemplates: "Copiar plantillas", runUrlTest: "Ejecutar prueba de URL", helperHint: "Haga clic primero en el campo Automations/Actions URL y después abra este ayudante. Si no se encuentra un campo URL, la URL se copia al portapapeles.",
    copyableTemplates: "Plantillas copiables", clipboardUnavailable: "Portapapeles no disponible. Seleccione el texto manualmente.", urlInserted: "URL insertada en el campo.", noUrlFieldCopied: "No se encontró campo URL, por eso se copió la URL al portapapeles.", runningTestUrl: "Ejecutando URL de prueba...",
    testRequestSent: "Solicitud de prueba enviada. Compruebe la respuesta del dispositivo.", testRequestFailed: "La solicitud de prueba no se ejecutó. Compruebe la IP y la red.", urlCopied: "URL copiada al portapapeles.", templatesCopied: "Plantillas copiadas al portapapeles.", homeAssistantRest: "Comando REST de Home Assistant:", manualAllow: "permiso manual"
  });
  Object.assign(MESSAGES.de, {
    noActiveTab: "Kein aktiver Tab.", active: "Aktiv", detected: "erkannt", notActive: "Nicht aktiv", notAvailableOnPage: "Auf dieser Seite nicht verfügbar", helperOpened: "Helfer auf der Seite geöffnet.", helperCannotOpen: "Der Helfer kann auf dieser Seite nicht geöffnet werden.",
    helperAlwaysAppear: "Der Helfer wird auf diesem Host immer angezeigt.", couldNotAllow: "Diese Seite konnte nicht erlaubt werden.", helperHiddenHost: "Der Helfer bleibt auf diesem Host verborgen.", couldNotBlock: "Diese Seite konnte nicht blockiert werden.",
    optionsTitle: "Shelly Installer Helper Einstellungen", autoApi: "Automatische Shelly API-Erkennung", autoAp: "Automatisch auf 192.168.33.1 anzeigen", autoFingerprint: "HTML/UI-Fingerprint-Fallback auf privaten Netzwerkhosts", defaultIp: "Standard-IP/Host für den URL-Generator",
    allowedHosts: "Immer erlaubte Hosts", blockedHosts: "Blockierte Hosts", save: "Speichern", resetDefaults: "Standardwerte zurücksetzen", settingsSaved: "Einstellungen gespeichert.", defaultsRestored: "Standardwerte wiederhergestellt.",
    lightProfile: "Light-Profil: /light/0..3", rgbProfile: "RGB-Profil: /color/0", rgbwProfile: "RGBW-Profil: /color/0", whiteMode: "Weißmodus: /white/0..3", colorMode: "Farbmodus: /color/0", lightComponent: "Light-Komponente: /light/0..",
    dimmerEndpoint: "Dimmer/Light-Endpunkt", relayEndpoint: "Relais/Schalter: /relay/0..", relaySwitchMode: "Relais/Schalter-Modus: /relay/0..1", coverMode: "Cover/Rollladen-Modus: /roller/0", coverEndpoint: "Cover/Rollladen-Endpunkt",
    noControlTemplate: "Keine Steuer-URL-Vorlage", shellyApAddress: "Shelly AP-Adresse", shellyDevice: "Shelly-Gerät", noDeviceCatalog: "Kein Gerätekatalog", noChannel: "kein Kanal", channel: "Kanal",
    noSafeTemplate: "Für diesen Gerätetyp gibt es noch keine sichere Steuer-URL-Vorlage. Verwenden Sie den Bereich Geräteinfo und Diagnose oder wählen Sie ein relay-, light- oder RGBW-Gerät.", curlTest: "curl-Test", noDeviceUrlTemplate: "Dieses Gerät hat keine Steuer-URL-Vorlage.",
    detection: "Erkennung", generation: "Generation", unknown: "unbekannt", wifiVerified: "Wi‑Fi-Verbindung geprüft", firmwareRecorded: "Firmware-Version notiert", cloudMqttSet: "Cloud/MQTT wie vorgesehen eingestellt", actionUrlTested: "Actions/Automations-URL getestet",
    physicalChannelMatches: "Physischer Kanal passt zur Beschriftung", noOutputFound: "Auf dieser Seite wurde kein relay- oder light-Ausgang gefunden.", openShellyHelper: "Shelly-Helfer öffnen", closeShellyHelper: "Shelly-Helfer schließen", shellyInstallerHelper: "Shelly Installationshelfer",
    installerPanel: "Installations-Bedienfeld", automationUrlHelper: "Automation-URL-Helfer", refreshDeviceData: "Gerätedaten aktualisieren", deviceDetection: "Geräteerkennung", outputState: "Aktueller Ausgangszustand", loadingState: "Status wird geladen...", installationChecklist: "Installations-Checkliste",
    helper: "Helfer", automationUrlBuilder: "Automation-URL-Generator", closeHelper: "Helfer schließen", deviceIpHost: "IP-Adresse oder Hostname des Geräts", deviceType: "Gerätetyp", operatingMode: "Betriebsmodus", action: "Aktion", turnOn: "Einschalten", turnOff: "Ausschalten",
    toggle: "Umschalten", brightness: "Helligkeit (%)", transition: "Übergang (ms)", transitionPlaceholder: "z. B. 500", timer: "Timer / Auto-off (s)", optional: "optional", whiteLevel: "Weißwert (0-255)", profile: "Profil", generatedUrl: "Generierte URL",
    insertIntoField: "In Feld einfügen", copy: "Kopieren", copyTemplates: "Vorlagen kopieren", runUrlTest: "URL-Test starten", helperHint: "Klicken Sie zuerst in das Automations/Actions-URL-Feld und öffnen Sie dann diesen Helfer. Wenn kein URL-Feld gefunden wird, wird die URL in die Zwischenablage kopiert.",
    copyableTemplates: "Kopierbare Vorlagen", clipboardUnavailable: "Zwischenablage nicht verfügbar. Wählen Sie den Text manuell aus.", urlInserted: "URL in das Feld eingefügt.", noUrlFieldCopied: "Kein URL-Feld gefunden, daher wurde die URL in die Zwischenablage kopiert.", runningTestUrl: "Test-URL wird ausgeführt...",
    testRequestSent: "Testanfrage gesendet. Prüfen Sie die Reaktion des Geräts.", testRequestFailed: "Die Testanfrage wurde nicht ausgeführt. Prüfen Sie IP-Adresse und Netzwerk.", urlCopied: "URL in die Zwischenablage kopiert.", templatesCopied: "Vorlagen in die Zwischenablage kopiert.", homeAssistantRest: "Home Assistant REST-Befehl:", manualAllow: "manuell erlaubt"
  });
  Object.assign(MESSAGES.nl, {
    noActiveTab: "Geen actief tabblad.", active: "Actief", detected: "gedetecteerd", notActive: "Niet actief", notAvailableOnPage: "Niet beschikbaar op deze pagina", helperOpened: "Helper geopend op de pagina.", helperCannotOpen: "De helper kan niet worden geopend op deze pagina.",
    helperAlwaysAppear: "De helper wordt altijd op deze host getoond.", couldNotAllow: "Deze pagina kon niet worden toegestaan.", helperHiddenHost: "De helper blijft verborgen op deze host.", couldNotBlock: "Deze pagina kon niet worden geblokkeerd.",
    optionsTitle: "Shelly Installer Helper instellingen", autoApi: "Automatische Shelly API-detectie", autoAp: "Automatisch tonen op 192.168.33.1", autoFingerprint: "HTML/UI fingerprint fallback op private netwerkhosts", defaultIp: "Standaard IP/host voor de URL-generator",
    allowedHosts: "Altijd toegestane hosts", blockedHosts: "Geblokkeerde hosts", save: "Opslaan", resetDefaults: "Standaard herstellen", settingsSaved: "Instellingen opgeslagen.", defaultsRestored: "Standaardinstellingen hersteld.",
    lightProfile: "Light-profiel: /light/0..3", rgbProfile: "RGB-profiel: /color/0", rgbwProfile: "RGBW-profiel: /color/0", whiteMode: "Witmodus: /white/0..3", colorMode: "Kleurmodus: /color/0", lightComponent: "Light-component: /light/0..",
    dimmerEndpoint: "Dimmer/light endpoint", relayEndpoint: "Relais/schakelaar: /relay/0..", relaySwitchMode: "Relais/schakelaar-modus: /relay/0..1", coverMode: "Cover/rolluik-modus: /roller/0", coverEndpoint: "Cover/rolluik endpoint",
    noControlTemplate: "Geen besturings-URL-sjabloon", shellyApAddress: "Shelly AP-adres", shellyDevice: "Shelly-apparaat", noDeviceCatalog: "Geen apparaatcatalogus", noChannel: "geen kanaal", channel: "Kanaal",
    noSafeTemplate: "Dit apparaattype heeft nog geen veilig besturings-URL-sjabloon. Gebruik de apparaatinfo en diagnose, of kies een relay-, light- of RGBW-apparaat.", curlTest: "curl-test", noDeviceUrlTemplate: "Dit apparaat heeft geen besturings-URL-sjabloon.",
    detection: "Detectie", generation: "Generatie", unknown: "onbekend", wifiVerified: "Wi‑Fi-verbinding gecontroleerd", firmwareRecorded: "Firmwareversie genoteerd", cloudMqttSet: "Cloud/MQTT ingesteld zoals bedoeld", actionUrlTested: "Actions/Automations URL getest",
    physicalChannelMatches: "Fysiek kanaal komt overeen met label", noOutputFound: "Geen relay- of light-uitgang gevonden op deze pagina.", openShellyHelper: "Shelly-helper openen", closeShellyHelper: "Shelly-helper sluiten", shellyInstallerHelper: "Shelly installatiehulp",
    installerPanel: "Installatiebedieningspaneel", automationUrlHelper: "Automation URL-helper", refreshDeviceData: "Apparaatgegevens vernieuwen", deviceDetection: "Apparaatdetectie", outputState: "Huidige uitgangsstatus", loadingState: "Status laden...", installationChecklist: "Installatiechecklist",
    helper: "Helper", automationUrlBuilder: "Automation URL-bouwer", closeHelper: "Helper sluiten", deviceIpHost: "IP-adres of hostnaam van apparaat", deviceType: "Apparaattype", operatingMode: "Bedrijfsmodus", action: "Actie", turnOn: "Inschakelen", turnOff: "Uitschakelen",
    toggle: "Omschakelen", brightness: "Helderheid (%)", transition: "Overgang (ms)", transitionPlaceholder: "bijv. 500", timer: "Timer / auto-off (s)", optional: "optioneel", whiteLevel: "Witniveau (0-255)", profile: "Profiel", generatedUrl: "Gegenereerde URL",
    insertIntoField: "In veld invoegen", copy: "Kopiëren", copyTemplates: "Sjablonen kopiëren", runUrlTest: "URL-test uitvoeren", helperHint: "Klik eerst in het Automations/Actions URL-veld en open daarna deze helper. Als er geen URL-veld wordt gevonden, wordt de URL naar het klembord gekopieerd.",
    copyableTemplates: "Kopieerbare sjablonen", clipboardUnavailable: "Klembord niet beschikbaar. Selecteer de tekst handmatig.", urlInserted: "URL ingevoegd in het veld.", noUrlFieldCopied: "Geen URL-veld gevonden, daarom is de URL naar het klembord gekopieerd.", runningTestUrl: "Test-URL uitvoeren...",
    testRequestSent: "Testverzoek verzonden. Controleer de reactie van het apparaat.", testRequestFailed: "Het testverzoek is niet uitgevoerd. Controleer IP-adres en netwerk.", urlCopied: "URL naar klembord gekopieerd.", templatesCopied: "Sjablonen naar klembord gekopieerd.", homeAssistantRest: "Home Assistant REST-opdracht:", manualAllow: "handmatig toegestaan"
  });
  Object.assign(MESSAGES.it, {
    noActiveTab: "Nessuna scheda attiva.", active: "Attivo", detected: "rilevato", notActive: "Non attivo", notAvailableOnPage: "Non disponibile su questa pagina", helperOpened: "Helper aperto sulla pagina.", helperCannotOpen: "L'helper non può essere aperto su questa pagina.",
    helperAlwaysAppear: "L'helper apparirà sempre su questo host.", couldNotAllow: "Impossibile consentire questa pagina.", helperHiddenHost: "L'helper resterà nascosto su questo host.", couldNotBlock: "Impossibile bloccare questa pagina.",
    optionsTitle: "Impostazioni Shelly Installer Helper", autoApi: "Rilevamento automatico API Shelly", autoAp: "Mostra automaticamente su 192.168.33.1", autoFingerprint: "Fallback fingerprint HTML/UI su host di rete privata", defaultIp: "IP/host predefinito per il generatore URL",
    allowedHosts: "Host sempre consentiti", blockedHosts: "Host bloccati", save: "Salva", resetDefaults: "Ripristina predefiniti", settingsSaved: "Impostazioni salvate.", defaultsRestored: "Impostazioni predefinite ripristinate.",
    lightProfile: "Profilo light: /light/0..3", rgbProfile: "Profilo RGB: /color/0", rgbwProfile: "Profilo RGBW: /color/0", whiteMode: "Modalità bianco: /white/0..3", colorMode: "Modalità colore: /color/0", lightComponent: "Componente light: /light/0..",
    dimmerEndpoint: "Endpoint dimmer/light", relayEndpoint: "Relè/interruttore: /relay/0..", relaySwitchMode: "Modalità relè/interruttore: /relay/0..1", coverMode: "Modalità cover/tapparella: /roller/0", coverEndpoint: "Endpoint cover/tapparella",
    noControlTemplate: "Nessun modello URL di controllo", shellyApAddress: "Indirizzo Shelly AP", shellyDevice: "Dispositivo Shelly", noDeviceCatalog: "Nessun catalogo dispositivi", noChannel: "nessun canale", channel: "Canale",
    noSafeTemplate: "Questo tipo di dispositivo non ha ancora un modello URL di controllo sicuro. Usa la sezione informazioni e diagnostica o scegli un dispositivo relay, light o RGBW.", curlTest: "test curl", noDeviceUrlTemplate: "Questo dispositivo non ha un modello URL di controllo.",
    detection: "Rilevamento", generation: "Generazione", unknown: "sconosciuto", wifiVerified: "Connessione Wi‑Fi verificata", firmwareRecorded: "Versione firmware registrata", cloudMqttSet: "Cloud/MQTT impostato come previsto", actionUrlTested: "URL Actions/Automations testato",
    physicalChannelMatches: "Il canale fisico corrisponde all'etichetta", noOutputFound: "Nessuna uscita relay o light trovata su questa pagina.", openShellyHelper: "Apri helper Shelly", closeShellyHelper: "Chiudi helper Shelly", shellyInstallerHelper: "Helper installatore Shelly",
    installerPanel: "Pannello di controllo installatore", automationUrlHelper: "Helper Automation URL", refreshDeviceData: "Aggiorna dati dispositivo", deviceDetection: "Rilevamento dispositivo", outputState: "Stato attuale uscite", loadingState: "Caricamento stato...", installationChecklist: "Checklist installazione",
    helper: "Helper", automationUrlBuilder: "Builder Automation URL", closeHelper: "Chiudi helper", deviceIpHost: "Indirizzo IP o hostname del dispositivo", deviceType: "Tipo dispositivo", operatingMode: "Modalità operativa", action: "Azione", turnOn: "Accendi", turnOff: "Spegni",
    toggle: "Commuta", brightness: "Luminosità (%)", transition: "Transizione (ms)", transitionPlaceholder: "es. 500", timer: "Timer / auto-off (s)", optional: "opzionale", whiteLevel: "Livello bianco (0-255)", profile: "Profilo", generatedUrl: "URL generato",
    insertIntoField: "Inserisci nel campo", copy: "Copia", copyTemplates: "Copia modelli", runUrlTest: "Esegui test URL", helperHint: "Fai prima clic nel campo Automations/Actions URL, poi apri questo helper. Se non viene trovato un campo URL, l'URL viene copiato negli appunti.",
    copyableTemplates: "Modelli copiabili", clipboardUnavailable: "Appunti non disponibili. Seleziona il testo manualmente.", urlInserted: "URL inserito nel campo.", noUrlFieldCopied: "Nessun campo URL trovato, quindi l'URL è stato copiato negli appunti.", runningTestUrl: "Esecuzione URL di test...",
    testRequestSent: "Richiesta di test inviata. Controlla la risposta del dispositivo.", testRequestFailed: "La richiesta di test non è stata eseguita. Controlla IP e rete.", urlCopied: "URL copiato negli appunti.", templatesCopied: "Modelli copiati negli appunti.", homeAssistantRest: "Comando REST Home Assistant:", manualAllow: "consenso manuale"
  });
  Object.assign(MESSAGES.sr, {
    noActiveTab: "Nema aktivne kartice.", active: "Aktivno", detected: "detektovano", notActive: "Nije aktivno", notAvailableOnPage: "Nije dostupno na ovoj stranici", helperOpened: "Pomoćnik je otvoren na stranici.", helperCannotOpen: "Pomoćnik ne može da se otvori na ovoj stranici.",
    helperAlwaysAppear: "Pomoćnik će se uvek prikazivati na ovom hostu.", couldNotAllow: "Nije moguće dozvoliti ovu stranicu.", helperHiddenHost: "Pomoćnik će ostati sakriven na ovom hostu.", couldNotBlock: "Nije moguće blokirati ovu stranicu.",
    optionsTitle: "Podešavanja Shelly Installer Helper", autoApi: "Automatska detekcija Shelly API-ja", autoAp: "Automatski prikaži na 192.168.33.1", autoFingerprint: "HTML/UI fingerprint fallback na privatnim mrežnim hostovima", defaultIp: "Podrazumevani IP/host uređaja za URL generator",
    allowedHosts: "Uvek dozvoljeni hostovi", blockedHosts: "Blokirani hostovi", save: "Sačuvaj", resetDefaults: "Vrati podrazumevano", settingsSaved: "Podešavanja sačuvana.", defaultsRestored: "Podrazumevana podešavanja vraćena.",
    lightProfile: "Light profil: /light/0..3", rgbProfile: "RGB profil: /color/0", rgbwProfile: "RGBW profil: /color/0", whiteMode: "Beli režim: /white/0..3", colorMode: "Režim boje: /color/0", lightComponent: "Light komponenta: /light/0..",
    dimmerEndpoint: "Dimmer/light endpoint", relayEndpoint: "Relej/prekidač: /relay/0..", relaySwitchMode: "Režim relej/prekidač: /relay/0..1", coverMode: "Cover/roletna režim: /roller/0", coverEndpoint: "Cover/roletna endpoint",
    noControlTemplate: "Nema šablona kontrolnog URL-a", shellyApAddress: "Shelly AP adresa", shellyDevice: "Shelly uređaj", noDeviceCatalog: "Nema kataloga uređaja", noChannel: "nema kanala", channel: "Kanal",
    noSafeTemplate: "Ovaj tip uređaja još nema bezbedan šablon kontrolnog URL-a. Koristite informacije i dijagnostiku uređaja ili izaberite relay, light ili RGBW uređaj.", curlTest: "curl test", noDeviceUrlTemplate: "Ovaj uređaj nema šablon kontrolnog URL-a.",
    detection: "Detekcija", generation: "Generacija", unknown: "nepoznato", wifiVerified: "Wi‑Fi veza proverena", firmwareRecorded: "Verzija firmvera zabeležena", cloudMqttSet: "Cloud/MQTT podešen kako je planirano", actionUrlTested: "Actions/Automations URL testiran",
    physicalChannelMatches: "Fizički kanal odgovara oznaci", noOutputFound: "Na ovoj stranici nije pronađen relay ili light izlaz.", openShellyHelper: "Otvori Shelly pomoćnik", closeShellyHelper: "Zatvori Shelly pomoćnik", shellyInstallerHelper: "Shelly pomoćnik instalatera",
    installerPanel: "Kontrolni panel instalatera", automationUrlHelper: "Automation URL pomoćnik", refreshDeviceData: "Osveži podatke uređaja", deviceDetection: "Detekcija uređaja", outputState: "Trenutno stanje izlaza", loadingState: "Učitavanje stanja...", installationChecklist: "Instalaciona checklist",
    helper: "Pomoćnik", automationUrlBuilder: "Automation URL builder", closeHelper: "Zatvori pomoćnik", deviceIpHost: "IP adresa ili hostname uređaja", deviceType: "Tip uređaja", operatingMode: "Režim rada", action: "Akcija", turnOn: "Uključi", turnOff: "Isključi",
    toggle: "Prebaci", brightness: "Osvetljenje (%)", transition: "Prelaz (ms)", transitionPlaceholder: "npr. 500", timer: "Timer / auto-off (s)", optional: "opciono", whiteLevel: "Nivo bele (0-255)", profile: "Profil", generatedUrl: "Generisan URL",
    insertIntoField: "Ubaci u polje", copy: "Kopiraj", copyTemplates: "Kopiraj šablone", runUrlTest: "Pokreni URL test", helperHint: "Prvo kliknite u Automations/Actions URL polje, zatim otvorite ovaj pomoćnik. Ako URL polje nije pronađeno, URL se kopira u clipboard.",
    copyableTemplates: "Šabloni za kopiranje", clipboardUnavailable: "Clipboard nije dostupan. Ručno označite tekst.", urlInserted: "URL ubačen u polje.", noUrlFieldCopied: "URL polje nije pronađeno, pa je URL kopiran u clipboard.", runningTestUrl: "Pokretanje test URL-a...",
    testRequestSent: "Test zahtev poslat. Proverite reakciju uređaja.", testRequestFailed: "Test zahtev nije pokrenut. Proverite IP adresu i mrežu.", urlCopied: "URL kopiran u clipboard.", templatesCopied: "Šabloni kopirani u clipboard.", homeAssistantRest: "Home Assistant REST komanda:", manualAllow: "ručno dozvoljeno"
  });
  Object.assign(MESSAGES.hr, {
    noActiveTab: "Nema aktivne kartice.", active: "Aktivno", detected: "detektirano", notActive: "Nije aktivno", notAvailableOnPage: "Nije dostupno na ovoj stranici", helperOpened: "Pomoćnik je otvoren na stranici.", helperCannotOpen: "Pomoćnik se ne može otvoriti na ovoj stranici.",
    helperAlwaysAppear: "Pomoćnik će se uvijek prikazivati na ovom hostu.", couldNotAllow: "Nije moguće dopustiti ovu stranicu.", helperHiddenHost: "Pomoćnik će ostati skriven na ovom hostu.", couldNotBlock: "Nije moguće blokirati ovu stranicu.",
    optionsTitle: "Postavke Shelly Installer Helper", autoApi: "Automatsko otkrivanje Shelly API-ja", autoAp: "Automatski prikaži na 192.168.33.1", autoFingerprint: "HTML/UI fingerprint fallback na privatnim mrežnim hostovima", defaultIp: "Zadani IP/host uređaja za URL generator",
    allowedHosts: "Uvijek dopušteni hostovi", blockedHosts: "Blokirani hostovi", save: "Spremi", resetDefaults: "Vrati zadano", settingsSaved: "Postavke spremljene.", defaultsRestored: "Zadane postavke vraćene.",
    lightProfile: "Light profil: /light/0..3", rgbProfile: "RGB profil: /color/0", rgbwProfile: "RGBW profil: /color/0", whiteMode: "Bijeli način: /white/0..3", colorMode: "Način boje: /color/0", lightComponent: "Light komponenta: /light/0..",
    dimmerEndpoint: "Dimmer/light endpoint", relayEndpoint: "Relej/prekidač: /relay/0..", relaySwitchMode: "Način relej/prekidač: /relay/0..1", coverMode: "Cover/roleta način: /roller/0", coverEndpoint: "Cover/roleta endpoint",
    noControlTemplate: "Nema predloška kontrolnog URL-a", shellyApAddress: "Shelly AP adresa", shellyDevice: "Shelly uređaj", noDeviceCatalog: "Nema kataloga uređaja", noChannel: "nema kanala", channel: "Kanal",
    noSafeTemplate: "Ovaj tip uređaja još nema siguran predložak kontrolnog URL-a. Koristite podatke i dijagnostiku uređaja ili odaberite relay, light ili RGBW uređaj.", curlTest: "curl test", noDeviceUrlTemplate: "Ovaj uređaj nema predložak kontrolnog URL-a.",
    detection: "Detekcija", generation: "Generacija", unknown: "nepoznato", wifiVerified: "Wi‑Fi veza provjerena", firmwareRecorded: "Verzija firmwarea zabilježena", cloudMqttSet: "Cloud/MQTT postavljen prema namjeri", actionUrlTested: "Actions/Automations URL testiran",
    physicalChannelMatches: "Fizički kanal odgovara oznaci", noOutputFound: "Na ovoj stranici nije pronađen relay ili light izlaz.", openShellyHelper: "Otvori Shelly pomoćnik", closeShellyHelper: "Zatvori Shelly pomoćnik", shellyInstallerHelper: "Shelly pomoćnik instalatera",
    installerPanel: "Kontrolna ploča instalatera", automationUrlHelper: "Automation URL pomoćnik", refreshDeviceData: "Osvježi podatke uređaja", deviceDetection: "Detekcija uređaja", outputState: "Trenutno stanje izlaza", loadingState: "Učitavanje stanja...", installationChecklist: "Instalacijska checklist",
    helper: "Pomoćnik", automationUrlBuilder: "Automation URL builder", closeHelper: "Zatvori pomoćnik", deviceIpHost: "IP adresa ili hostname uređaja", deviceType: "Tip uređaja", operatingMode: "Način rada", action: "Akcija", turnOn: "Uključi", turnOff: "Isključi",
    toggle: "Prebaci", brightness: "Svjetlina (%)", transition: "Prijelaz (ms)", transitionPlaceholder: "npr. 500", timer: "Timer / auto-off (s)", optional: "opcionalno", whiteLevel: "Razina bijele (0-255)", profile: "Profil", generatedUrl: "Generirani URL",
    insertIntoField: "Umetni u polje", copy: "Kopiraj", copyTemplates: "Kopiraj predloške", runUrlTest: "Pokreni URL test", helperHint: "Prvo kliknite u Automations/Actions URL polje, zatim otvorite ovaj pomoćnik. Ako URL polje nije pronađeno, URL se kopira u međuspremnik.",
    copyableTemplates: "Predlošci za kopiranje", clipboardUnavailable: "Međuspremnik nije dostupan. Ručno označite tekst.", urlInserted: "URL umetnut u polje.", noUrlFieldCopied: "URL polje nije pronađeno, pa je URL kopiran u međuspremnik.", runningTestUrl: "Pokretanje testnog URL-a...",
    testRequestSent: "Testni zahtjev poslan. Provjerite reakciju uređaja.", testRequestFailed: "Testni zahtjev nije pokrenut. Provjerite IP adresu i mrežu.", urlCopied: "URL kopiran u međuspremnik.", templatesCopied: "Predlošci kopirani u međuspremnik.", homeAssistantRest: "Home Assistant REST naredba:", manualAllow: "ručno dopušteno"
  });
  Object.assign(MESSAGES.pl, {
    noActiveTab: "Brak aktywnej karty.", active: "Aktywne", detected: "wykryto", notActive: "Nieaktywne", notAvailableOnPage: "Niedostępne na tej stronie", helperOpened: "Pomocnik otwarty na stronie.", helperCannotOpen: "Nie można otworzyć pomocnika na tej stronie.",
    helperAlwaysAppear: "Pomocnik będzie zawsze widoczny na tym hoście.", couldNotAllow: "Nie udało się zezwolić na tę stronę.", helperHiddenHost: "Pomocnik pozostanie ukryty na tym hoście.", couldNotBlock: "Nie udało się zablokować tej strony.",
    optionsTitle: "Ustawienia Shelly Installer Helper", autoApi: "Automatyczne wykrywanie Shelly API", autoAp: "Automatycznie pokazuj na 192.168.33.1", autoFingerprint: "Fallback fingerprint HTML/UI na prywatnych hostach sieciowych", defaultIp: "Domyślny IP/host urządzenia dla generatora URL",
    allowedHosts: "Zawsze dozwolone hosty", blockedHosts: "Zablokowane hosty", save: "Zapisz", resetDefaults: "Przywróć domyślne", settingsSaved: "Ustawienia zapisane.", defaultsRestored: "Ustawienia domyślne przywrócone.",
    lightProfile: "Profil light: /light/0..3", rgbProfile: "Profil RGB: /color/0", rgbwProfile: "Profil RGBW: /color/0", whiteMode: "Tryb biały: /white/0..3", colorMode: "Tryb kolor: /color/0", lightComponent: "Komponent light: /light/0..",
    dimmerEndpoint: "Endpoint dimmer/light", relayEndpoint: "Przekaźnik/przełącznik: /relay/0..", relaySwitchMode: "Tryb przekaźnik/przełącznik: /relay/0..1", coverMode: "Tryb cover/roleta: /roller/0", coverEndpoint: "Endpoint cover/roleta",
    noControlTemplate: "Brak szablonu URL sterowania", shellyApAddress: "Adres Shelly AP", shellyDevice: "Urządzenie Shelly", noDeviceCatalog: "Brak katalogu urządzeń", noChannel: "brak kanału", channel: "Kanał",
    noSafeTemplate: "Ten typ urządzenia nie ma jeszcze bezpiecznego szablonu URL sterowania. Użyj sekcji informacji i diagnostyki albo wybierz urządzenie relay, light lub RGBW.", curlTest: "test curl", noDeviceUrlTemplate: "To urządzenie nie ma szablonu URL sterowania.",
    detection: "Wykrywanie", generation: "Generacja", unknown: "nieznane", wifiVerified: "Połączenie Wi‑Fi sprawdzone", firmwareRecorded: "Wersja firmware zapisana", cloudMqttSet: "Cloud/MQTT ustawione zgodnie z zamiarem", actionUrlTested: "URL Actions/Automations przetestowany",
    physicalChannelMatches: "Fizyczny kanał pasuje do etykiety", noOutputFound: "Na tej stronie nie znaleziono wyjścia relay ani light.", openShellyHelper: "Otwórz pomocnik Shelly", closeShellyHelper: "Zamknij pomocnik Shelly", shellyInstallerHelper: "Pomocnik instalatora Shelly",
    installerPanel: "Panel sterowania instalatora", automationUrlHelper: "Pomocnik Automation URL", refreshDeviceData: "Odśwież dane urządzenia", deviceDetection: "Wykrywanie urządzenia", outputState: "Aktualny stan wyjść", loadingState: "Ładowanie stanu...", installationChecklist: "Lista kontrolna instalacji",
    helper: "Pomocnik", automationUrlBuilder: "Kreator Automation URL", closeHelper: "Zamknij pomocnik", deviceIpHost: "Adres IP lub hostname urządzenia", deviceType: "Typ urządzenia", operatingMode: "Tryb pracy", action: "Akcja", turnOn: "Włącz", turnOff: "Wyłącz",
    toggle: "Przełącz", brightness: "Jasność (%)", transition: "Przejście (ms)", transitionPlaceholder: "np. 500", timer: "Timer / auto-off (s)", optional: "opcjonalnie", whiteLevel: "Poziom bieli (0-255)", profile: "Profil", generatedUrl: "Wygenerowany URL",
    insertIntoField: "Wstaw do pola", copy: "Kopiuj", copyTemplates: "Kopiuj szablony", runUrlTest: "Uruchom test URL", helperHint: "Najpierw kliknij pole Automations/Actions URL, a potem otwórz pomocnika. Jeśli pole URL nie zostanie znalezione, URL zostanie skopiowany do schowka.",
    copyableTemplates: "Szablony do kopiowania", clipboardUnavailable: "Schowek niedostępny. Zaznacz tekst ręcznie.", urlInserted: "URL wstawiony do pola.", noUrlFieldCopied: "Nie znaleziono pola URL, więc URL skopiowano do schowka.", runningTestUrl: "Uruchamianie testowego URL...",
    testRequestSent: "Żądanie testowe wysłane. Sprawdź reakcję urządzenia.", testRequestFailed: "Żądanie testowe nie zostało wykonane. Sprawdź adres IP i sieć.", urlCopied: "URL skopiowany do schowka.", templatesCopied: "Szablony skopiowane do schowka.", homeAssistantRest: "Polecenie REST Home Assistant:", manualAllow: "ręczne zezwolenie"
  });
  Object.assign(MESSAGES.pt, {
    noActiveTab: "Nenhum separador ativo.", active: "Ativo", detected: "detetado", notActive: "Inativo", notAvailableOnPage: "Indisponível nesta página", helperOpened: "Assistente aberto na página.", helperCannotOpen: "O assistente não pode ser aberto nesta página.",
    helperAlwaysAppear: "O assistente aparecerá sempre neste host.", couldNotAllow: "Não foi possível permitir esta página.", helperHiddenHost: "O assistente ficará oculto neste host.", couldNotBlock: "Não foi possível bloquear esta página.",
    optionsTitle: "Definições do Shelly Installer Helper", autoApi: "Deteção automática da API Shelly", autoAp: "Mostrar automaticamente em 192.168.33.1", autoFingerprint: "Fallback de fingerprint HTML/UI em hosts de rede privada", defaultIp: "IP/host predefinido para o gerador de URL",
    allowedHosts: "Hosts sempre permitidos", blockedHosts: "Hosts bloqueados", save: "Guardar", resetDefaults: "Repor predefinições", settingsSaved: "Definições guardadas.", defaultsRestored: "Predefinições restauradas.",
    lightProfile: "Perfil light: /light/0..3", rgbProfile: "Perfil RGB: /color/0", rgbwProfile: "Perfil RGBW: /color/0", whiteMode: "Modo branco: /white/0..3", colorMode: "Modo cor: /color/0", lightComponent: "Componente light: /light/0..",
    dimmerEndpoint: "Endpoint dimmer/light", relayEndpoint: "Relé/interruptor: /relay/0..", relaySwitchMode: "Modo relé/interruptor: /relay/0..1", coverMode: "Modo cover/estore: /roller/0", coverEndpoint: "Endpoint cover/estore",
    noControlTemplate: "Sem modelo de URL de controlo", shellyApAddress: "Endereço Shelly AP", shellyDevice: "Dispositivo Shelly", noDeviceCatalog: "Sem catálogo de dispositivos", noChannel: "sem canal", channel: "Canal",
    noSafeTemplate: "Este tipo de dispositivo ainda não tem um modelo seguro de URL de controlo. Use a secção de informação e diagnóstico do dispositivo ou escolha um dispositivo relay, light ou RGBW.", curlTest: "teste curl", noDeviceUrlTemplate: "Este dispositivo não tem modelo de URL de controlo.",
    detection: "Deteção", generation: "Geração", unknown: "desconhecido", wifiVerified: "Ligação Wi‑Fi verificada", firmwareRecorded: "Versão de firmware registada", cloudMqttSet: "Cloud/MQTT configurado como previsto", actionUrlTested: "URL Actions/Automations testado",
    physicalChannelMatches: "O canal físico corresponde à etiqueta", noOutputFound: "Não foi encontrada saída relay ou light nesta página.", openShellyHelper: "Abrir assistente Shelly", closeShellyHelper: "Fechar assistente Shelly", shellyInstallerHelper: "Assistente de instalação Shelly",
    installerPanel: "Painel de controlo do instalador", automationUrlHelper: "Assistente Automation URL", refreshDeviceData: "Atualizar dados do dispositivo", deviceDetection: "Deteção do dispositivo", outputState: "Estado atual das saídas", loadingState: "A carregar estado...", installationChecklist: "Checklist de instalação",
    helper: "Assistente", automationUrlBuilder: "Construtor Automation URL", closeHelper: "Fechar assistente", deviceIpHost: "Endereço IP ou hostname do dispositivo", deviceType: "Tipo de dispositivo", operatingMode: "Modo de operação", action: "Ação", turnOn: "Ligar", turnOff: "Desligar",
    toggle: "Alternar", brightness: "Brilho (%)", transition: "Transição (ms)", transitionPlaceholder: "ex. 500", timer: "Timer / auto-off (s)", optional: "opcional", whiteLevel: "Nível branco (0-255)", profile: "Perfil", generatedUrl: "URL gerado",
    insertIntoField: "Inserir no campo", copy: "Copiar", copyTemplates: "Copiar modelos", runUrlTest: "Executar teste URL", helperHint: "Clique primeiro no campo Automations/Actions URL e depois abra este assistente. Se nenhum campo URL for encontrado, o URL é copiado para a área de transferência.",
    copyableTemplates: "Modelos copiáveis", clipboardUnavailable: "Área de transferência indisponível. Selecione o texto manualmente.", urlInserted: "URL inserido no campo.", noUrlFieldCopied: "Nenhum campo URL foi encontrado, por isso o URL foi copiado para a área de transferência.", runningTestUrl: "A executar URL de teste...",
    testRequestSent: "Pedido de teste enviado. Verifique a resposta do dispositivo.", testRequestFailed: "O pedido de teste não foi executado. Verifique o endereço IP e a rede.", urlCopied: "URL copiado para a área de transferência.", templatesCopied: "Modelos copiados para a área de transferência.", homeAssistantRest: "Comando REST Home Assistant:", manualAllow: "permissão manual"
  });

  function normalizeLanguage(language) {
    const code = String(language || "en").toLowerCase().split("-")[0];
    return Object.prototype.hasOwnProperty.call(MESSAGES, code) ? code : "en";
  }

  function getMessages(language) {
    return { ...MESSAGES.en, ...(MESSAGES[normalizeLanguage(language)] || {}) };
  }

  function translate(language, key, replacements) {
    let value = getMessages(language)[key] || MESSAGES.en[key] || key;
    Object.entries(replacements || {}).forEach(([name, replacement]) => {
      value = value.replaceAll(`{${name}}`, String(replacement));
    });
    return value;
  }

  window.SHELLY_INSTALLER_HELPER_I18N = {
    languages: LANGUAGE_OPTIONS,
    messages: MESSAGES,
    normalizeLanguage,
    getMessages,
    t: translate
  };
})();
