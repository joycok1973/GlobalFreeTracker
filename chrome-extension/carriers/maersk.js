// Maersk — BL number appended directly to URL, no form filling required
CARRIER_CONFIGS['MAEU'] = {
  scac:        'MAEU',
  prefixes:    ['MAEU', 'MRKU', 'MSKU'],
  containerPrefixes: ['MAEU', 'MSKU', 'MRKU', 'MRSU', 'MHHU', 'MNBU', 'MGLU', 'PONU'], // PONU = legacy P&O Nedlloyd
  stripPrefix: true,
  hostname:    'www.maersk.com',
  url:         'https://www.maersk.com/tracking/',
  urlTemplate: 'https://www.maersk.com/tracking/{bookingNo}',
  inputSelectors: [],
  submitSelectors: [],
  submitMethod: 'none',
  // Maersk shows results straight from the URL (no form to fill). We still inject — only
  // to dismiss the Cookie Information consent banner — clicking "Essential only"
  // (declines non-essential cookies). Inject after load so we don't slow the page.
  injectOnComplete: true,
  consentSelectors: ['[data-test="coi-decline-all-button"]', 'button.coi-banner__decline'],

  scrape() {
    // TODO: extract tracking results from Maersk page
  }
};
