// Sea-Lead Shipping
CARRIER_CONFIGS['SJHH'] = {
  scac:        'SJHH',
  prefixes:    ['SJHH'],
  stripPrefix: false,
  hostname:    'www.sea-lead.com',
  url:         'https://www.sea-lead.com/track-shipment/',
  inputSelectors: [
    'input#bl_number',
    'input[name="bl_number"]',
    'input[placeholder*="Bill of lading" i]'
  ],
  submitSelectors: [
    'button[type="submit"].elementor-button',
    'button[type="submit"].nonfocus',
    'button[type="submit"]'
  ],
  submitMethod: 'click',

  scrape() {
    // TODO: extract tracking results from Sea-Lead page
  }
};
