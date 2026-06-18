// Seth Shipping
CARRIER_CONFIGS['SSPH'] = {
  scac:        'SSPH',
  prefixes:    ['SSPH'],
  stripPrefix: false,
  hostname:    'www.sethshipping.com',
  url:         'https://www.sethshipping.com/tracking_shipment',
  inputSelectors: [
    'input#containerid',
    'input[name="containerid"]'
  ],
  submitSelectors: [
    'input#findbt',
    'input[type="submit"].my-buttons'
  ],
  submitMethod: 'click',

  scrape() {
    // TODO: extract tracking results from Seth Shipping page
  }
};
