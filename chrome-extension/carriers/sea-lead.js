// Sea-Lead Shipping
CARRIER_CONFIGS['SJHH'] = {
  scac:        'SJHH',
  prefixes:    ['SJHH'],
  stripPrefix: false,
  hostname:    'www.sea-lead.com',
  url:         'https://www.sea-lead.com/track-shipment/',
  // Search type is a radio group (name="ts_track_option"): 1 = B/L, 2 = Container.
  // Selecting a radio runs ts_toggleInputs() to swap the visible input, so pick the
  // field by type too. (BL field is #bl_number; the container field selector is a
  // best guess — confirm against the live page.)
  searchType: {
    mode:   'radio',
    name:   'ts_track_option',
    values: { container: '2', bl: '1' }
  },
  inputSelectorsByType: {
    container: ['input[name*="container" i]', 'input[id*="container" i]', 'input[name*="cntr" i]'],
    bl:        ['input#bl_number', 'input[name="bl_number"]', 'input[placeholder*="Bill of lading" i]']
  },
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
  // The cookie banner ("…Accept") can render after load, so poll for it and dismiss it.
  // "Accept" matches the generic consent matcher ("Reject" does not), so it accepts.
  consentPoll: true,

  scrape() {
    // TODO: extract tracking results from Sea-Lead page
  }
};
