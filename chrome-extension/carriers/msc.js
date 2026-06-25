// MSC Mediterranean Shipping Company
CARRIER_CONFIGS['MSCU'] = {
  scac:     'MSCU',
  prefixes:    ['MSCU', 'MEDU', 'MSCW'],
  containerPrefixes: ['MSCU', 'MEDU', 'MSDU', 'MSMU', 'MSNU'],
  stripPrefix: false,
  hostname: 'www.msc.com',
  url:      'https://www.msc.com/en/track-a-shipment',
  inputSelectors: [
    '#trackingNumber',
    'input[x-model="trackingNumber"]',
    'input[placeholder*="Lading" i]',
    'input[placeholder*="Container" i]',
    'input[type="text"]:not([type="hidden"])'
  ],
  submitSelectors: ['button.msc-search-autocomplete__search'],
  submitMethod: 'request-submit',

  // MSC shows a OneTrust cookie banner that overlays the search form. Dismiss it
  // before filling — prefer "Reject All" (declines non-essential cookies); both
  // buttons close the banner. The same input box accepts BL / booking / container
  // numbers, so no search-type dropdown selection is needed.
  consentSelectors: ['#onetrust-reject-all-handler', '#onetrust-accept-btn-handler'],

  scrape() {
    // TODO: extract tracking results from MSC page
  }
};
