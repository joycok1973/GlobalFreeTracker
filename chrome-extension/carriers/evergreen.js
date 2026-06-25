// Evergreen Line (via Shipmentlink)
CARRIER_CONFIGS['EGLV'] = {
  scac:     'EGLV',
  prefixes:    ['EGLV'],
  containerPrefixes: ['EGHU', 'EGSU', 'EISU', 'EITU', 'EMCU'], // EMCU = Evergreen Marine Corp
  stripPrefix: true,
  hostname: 'ct.shipmentlink.com',
  url:      'https://ct.shipmentlink.com/servlet/TDB1_CargoTracking.do',
  inputSelectors: [
    '#NO',
    'input[name="NO"]',
    'input[type="text"]:not([type="hidden"])'
  ],
  submitSelectors: [],
  submitMethod: 'enter',

  scrape() {
    // TODO: extract tracking results from Evergreen / Shipmentlink page
  }
};
