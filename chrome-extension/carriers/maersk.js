// Maersk — BL number appended directly to URL, no form filling required
CARRIER_CONFIGS['MAEU'] = {
  scac:        'MAEU',
  prefixes:    ['MAEU', 'MRKU', 'MSKU'],
  // Maersk-owned codes + fully-integrated brands that track on maersk.com:
  // Maersk Line (MAEU/MSKU/MRKU/…), P&O Nedlloyd (PONU), Sealand (SEAU/SLLU/SEKU),
  // Safmarine (SAFU). Leased codes Maersk only operates (FFAU, TCLU, CAAU, …) are
  // intentionally excluded. Hamburg Süd (SUDU/HASU) has its own tracking site — not here.
  containerPrefixes: [
    'MAEU', 'MSKU', 'MRKU', 'MRSU', 'MHHU', 'MNBU', 'MGLU', 'MVIU', 'MCAU', 'MWCU', 'MIEU', 'MSAU',
    'PONU', 'SEAU', 'SLLU', 'SEKU', 'SAFU'
  ],
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
