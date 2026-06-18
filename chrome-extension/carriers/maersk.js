// Maersk — BL number appended directly to URL, no form filling required
CARRIER_CONFIGS['MAEU'] = {
  scac:        'MAEU',
  prefixes:    ['MAEU', 'MRKU', 'MSKU'],
  stripPrefix: true,
  hostname:    'www.maersk.com',
  url:         'https://www.maersk.com/tracking/',
  urlTemplate: 'https://www.maersk.com/tracking/{bookingNo}',
  inputSelectors: [],
  submitSelectors: [],
  submitMethod: 'none',

  scrape() {
    // TODO: extract tracking results from Maersk page
  }
};
