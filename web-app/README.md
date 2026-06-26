# web-app — fallback carrier picker

A single self-contained `index.html` (vanilla HTML/CSS/JS, no build step) used as the
extension's **fallback carrier selector**: when the extension can't auto-detect the
carrier, it opens this page (`?refno=<number>`); the user picks a carrier, and the page
sends the chosen SCAC back to the extension via `window.postMessage`.

This is a lightweight alternative to `../angular-app` (same behavior, ~few KB instead of
a ~1.3 MB Angular bundle). The `angular-app` is kept as-is; deploy whichever you prefer.

## Deploy
Host `index.html` at the URL configured in the extension's `MANUAL_SELECT_URL`
(`chrome-extension/background.js`) — e.g. `https://trace.divitsoftlabs.com`. The same
host must be listed in the manifest's `content_scripts.matches` so the page can talk to
the extension. For local dev, just open it from `http://localhost` (and point
`MANUAL_SELECT_URL` there).

## Maintenance
The `CARRIERS` array (name + SCAC) is inline in `index.html`. Keep the SCAC codes in
sync with `chrome-extension/carriers/*.js`.
