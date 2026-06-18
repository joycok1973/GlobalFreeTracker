# Shipping Tracker — Angular App + Chrome Extension

Select a shipping carrier portal in the Angular app and open it instantly via the Chrome extension.

---

## Project Structure

```
chrome-extension/          ← Load this folder as an unpacked extension
  manifest.json
  background.js
  content-script.js
  icons/

angular-app/               ← Angular 17 web app (runs on localhost:4200)
  src/
    app/app.component.ts
    app/app.component.html
    app/app.component.css
    main.ts
    index.html
    styles.css
  package.json
  angular.json
```

---

## How It Works

```
Angular App (localhost:4200)
    │  window.postMessage({ action: 'OPEN_SHIPPING_URL', url })
    ▼
Content Script (injected by extension into localhost:4200)
    │  chrome.runtime.sendMessage({ action: 'OPEN_SHIPPING_URL', url })
    ▼
Background Service Worker
    │  chrome.tabs.create({ url })
    ▼
New Chrome tab opens with the selected carrier portal
```

---

## Setup

### 1. Load the Chrome Extension

1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `chrome-extension/` folder

### 2. Run the Angular App

```bash
cd angular-app
npm install
npm start
```

App runs at **http://localhost:4200**

### 3. Use It

1. Open **http://localhost:4200** in Chrome (extension must be loaded)
2. Select a carrier from the dropdown:
   - **ONE Line** — Cargo Tracking
   - **MSC** — Track a Shipment
   - **OOCL** — Cargo Tracking
3. Click **Open in Browser via Extension**
4. The carrier site opens in a new Chrome tab

---

## Carrier Portals

| Carrier | URL |
|---------|-----|
| ONE Line | https://ecomm.one-line.com/one-ecom/manage-shipment/cargo-tracking |
| MSC | https://www.msc.com/en/track-a-shipment |
| OOCL | https://www.oocl.com/eng/ourservices/eservices/cargotracking/pages/cargotracking.aspx |

---

## Security

The background service worker validates every URL against an allowlist of trusted origins before opening a tab. Only the three carrier domains above are permitted.
