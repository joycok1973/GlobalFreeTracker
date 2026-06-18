// COSCO Shipping — BL number passed as URL query parameter, no form filling required
CARRIER_CONFIGS['COSU'] = {
  scac:        'COSU',
  prefixes:    ['COSU', 'COSE'],
  stripPrefix: true,
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
