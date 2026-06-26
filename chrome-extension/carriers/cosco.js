// COSCO Shipping — BL number passed as URL query parameter, no form filling required
CARRIER_CONFIGS['COSU'] = {
  scac:        'COSU',
  prefixes:    ['COSU', 'COSE'],
  containerPrefixes: ['COSU', 'CBHU', 'CCLU', 'CSNU', 'CSLU', 'CBXU'],
  stripPrefix: true,
  injectOnComplete: true,   // inject after the page (heavy SPA) has loaded
  // COSCO shows results from the URL (no form to fill). We inject only to dismiss its
  // cookie banner — the "Allow All" button (iView UI).
  consentSelectors: ['button.btnBlue.ivu-btn-primary', 'button.btnBlue'],
  hostname:    'elines.coscoshipping.com',
  url:         'https://elines.coscoshipping.com/ebusiness/cargoTracking',
  urlTemplate: 'https://elines.coscoshipping.com/ebusiness/cargoTracking?trackingType=BILLOFLADING&number={bookingNo}',
  inputSelectors: [],
  submitSelectors: [],
  submitMethod: 'none',

  scrape() {
    // TODO: extract tracking results from COSCO page
  }
};
