# Shelly Installer Helper

Shelly Installer Helper is a Chrome extension for installers, trainers and
smart-home technicians who work with Shelly devices through the local web
interface.

It adds a small floating helper panel on detected Shelly device pages. The
helper makes it easier to identify the device, inspect basic state and build
Action or Automation URLs without memorizing endpoint formats.

## What It Helps With

- Detecting Shelly Gen1 and Gen2+ local web pages.
- Opening automatically on the default Shelly AP address: `192.168.33.1`.
- Building local Action/Automation URLs for:
  - relay and switch devices,
  - Plus/Pro 2PM switch and cover modes,
  - dimmers,
  - RGBW/RGBW2 color and white modes,
  - Shelly UNI and Shelly Plus Uni outputs.
- Choosing only valid channel numbers from a dropdown.
- Copying generated URLs and ready-to-use examples.
- Filling the currently focused URL/webhook/action field.
- Showing basic device information and output state when the device API is available.
- Keeping a small installation checklist visible during setup.

## When The Helper Appears

The helper appears only when one of these conditions is true:

- the current page is `http://192.168.33.1/*`,
- the current host is manually allowed from the extension popup or options page,
- the current host responds to the Shelly Gen2+ API endpoint:
  `/rpc/Shelly.GetDeviceInfo`,
- the current host responds to the Shelly Gen1 API endpoint:
  `/shelly`,
- a local-network page looks like a Shelly web interface.

Hosts manually denied in the extension settings stay hidden.

## Install From Source

Until the extension is published in the Chrome Web Store, install it as an
unpacked extension:

1. Download or clone this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable Developer mode.
4. Click Load unpacked.
5. Select the repository folder that contains `manifest.json`.

## Basic Use

1. Open a Shelly device web interface, for example `http://192.168.33.1/`.
2. Use the floating tab on the right edge of the page.
3. Open Automation URL Helper.
4. Select the device type, mode, channel and action.
5. Copy the generated URL or insert it into the focused action URL field.

## Device And Channel Notes

Some Shelly devices expose different channel counts depending on the selected
mode:

- Shelly Plus 2 PM / Pro 2 PM / Pro 2 PM Gen4:
  - switch mode: 2 channels,
  - cover mode: 1 channel.
- Shelly Pro Dimmer 2 PM:
  - light mode: 2 channels.
- Shelly UNI / Shelly Plus Uni:
  - relay mode: 2 channels.
- RGBW/RGBW2:
  - white/light mode: 4 channels,
  - color/RGB/RGBW mode: 1 channel.

The channel selector follows these rules to avoid accidental invalid URLs.

## Privacy

The extension does not send data to external services and does not load remote
code. It only probes the currently open HTTP host to check whether it is a
Shelly device. Preferences such as allowed and denied hosts are stored locally
in Chrome storage.

See [PRIVACY.md](PRIVACY.md) for details.

## Status

Current version: `0.1.4`

This is an early public version intended for testing with real Shelly
installation workflows.
