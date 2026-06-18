// ONE Line (Ocean Network Express)
CARRIER_CONFIGS['ONEY'] = {
  scac:     'ONEY',
  prefixes:     ['ONEY', 'ONEU'],
  stripPrefix:  true,   // ONE Line search uses the BL number without the ONEY prefix
  hostname: 'ecomm.one-line.com',
  url:      'https://ecomm.one-line.com/one-ecom/manage-shipment/cargo-tracking',
  inputSelectors: [
    'input[placeholder*="B/L" i]',
    'input[placeholder*="booking" i]',
    'input[placeholder*="number" i]',
    'input[name*="blNo" i]',
    'input[id*="blNo" i]',
    'input[name*="tracking" i]',
    'input[type="text"]:not([type="hidden"])'
  ],
  submitSelectors: ['button[type="submit"]', 'input[type="submit"]'],
  submitMethod: 'click',
  typeMethod: 'instant',   // site's own keydown handlers conflict with char-by-char typing

  scrape() {
    // TODO: extract tracking results from ONE Line page
  }
};
