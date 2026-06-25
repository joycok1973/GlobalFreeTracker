// ONE Line (Ocean Network Express)
CARRIER_CONFIGS['ONEY'] = {
  scac:     'ONEY',
  prefixes:          ['ONEY'],   // BL / booking prefix (mapped via the MBL resolver)
  containerPrefixes: ['ONEU'],   // ONE-owned container codes (mapped via the container resolver)
  stripPrefix:  true,   // ONE Line search uses the BL number without the ONEY prefix
  hostname: 'ecomm.one-line.com',
  url:      'https://ecomm.one-line.com/one-ecom/manage-shipment/cargo-tracking',
  inputSelectors: [
    // The placeholder follows the dropdown ("Search by BL No. …" / "Search by Container No. …"),
    // so match the stable "Search by" prefix to cover every search category.
    'input[placeholder*="Search by" i]',
    'input[placeholder*="Container" i]',
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

  // Search-category dropdown (React Headless UI listbox) shown beside the input.
  // The fill engine picks the option matching the detected query type before typing,
  // so a container number searches as "Container No." instead of "BL No. or Booking No.".
  searchType: {
    triggerSelector: 'button[aria-haspopup="listbox"]',
    optionSelector:  '[role="option"]',
    labels: {
      container: 'Container No.',
      bl:        'BL No. or Booking No.'
    }
  },

  scrape() {
    // TODO: extract tracking results from ONE Line page
  }
};
