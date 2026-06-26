// Evergreen Line (via Shipmentlink)
CARRIER_CONFIGS['EGLV'] = {
  scac:     'EGLV',
  prefixes:    ['EGLV'],
  // Evergreen Group container owner codes (all track via ShipmentLink):
  // Evergreen Marine + subsidiaries — EMCU (Evergreen Marine Corp), EGSU (SG),
  // HMCU (UK), IMTU/LTIU (Italia Marittima / ex-Lloyd Triestino), UGMU.
  containerPrefixes: ['EGHU', 'EGSU', 'EISU', 'EITU', 'EMCU', 'HMCU', 'IMTU', 'LTIU', 'UGMU'],
  stripPrefix: true,
  // Inject only after the page has fully loaded (like OOCL) — injecting during load
  // competes with ShipmentLink's own initialization and slows the page.
  injectOnComplete: true,
  skipSubmit: true,   // TEMP DIAGNOSTIC: fill but don't click Submit (revert after testing)
  hostname: 'ct.shipmentlink.com',
  url:      'https://ct.shipmentlink.com/servlet/TDB1_CargoTracking.do',
  inputSelectors: [
    '#NO',
    'input[name="NO"]',
    'input[type="text"]:not([type="hidden"])'
  ],
  // Submit is an <input type="button" value="Submit" onclick="frmSubmit(13,2)"> — Enter
  // doesn't trigger it, so click the button.
  submitSelectors: ['input[type="button"][value="Submit"]', 'input[onclick*="frmSubmit"]'],
  submitMethod: 'click',

  // Search type is a radio group (name="SEL"): s_bl / s_cntr / bk. Select the radio
  // matching the query type before typing. Default on the page is Container (s_cntr),
  // so a BL search must switch to s_bl. (Booking isn't distinguished from BL here.)
  searchType: {
    mode:   'radio',
    name:   'SEL',
    values: { container: 's_cntr', bl: 's_bl' }
  },

  scrape() {
    // TODO: extract tracking results from Evergreen / Shipmentlink page
  }
};
