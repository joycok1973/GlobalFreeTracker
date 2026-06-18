// Carrier config registry — initialised before any carrier file is loaded.
// Each carriers/*.js file appends its config to this object.
//
// ── Supported Carriers ────────────────────────────────────────────────────────
//  #   SCAC   Liner                        File
//  1   ONEY   ONE Line (Ocean Network Express)   one-line.js
//  2   MSCU   MSC (Mediterranean Shipping Co.)   msc.js
//  3   OOLU   OOCL (Orient Overseas Container)   oocl.js
//  4   EGLV   Evergreen Marine                   evergreen.js
//  5   CMDU   CMA-CGM                            cma-cgm.js
//  6   MAEU   Maersk                             maersk.js
//  7   HDMU   HMM (Hyundai Merchant Marine)      hmm.js
//  8   HLCU   Hapag-Lloyd                        hapag-lloyd.js
//  9   COSU   COSCO Shipping                     cosco.js
//  10  VGLD   Vanguard Logistics                 vanguard.js
//  11  WHLC   Wan Hai Lines                      wan-hai.js
//  12  YMLU   Yang Ming Marine                   yang-ming.js
//  13  EMCU   Emirates Line                      emirates.js
//  14  ZIMU   ZIM Integrated Shipping            zim.js
//  15  SMLU   SM Line (Shanghai Minsheng)        sm-line.js
//  16  HDUJ   HEDE Hong Kong                     hede-hk.js
//  17  PABV   PIL (Pacific International Lines)  pil.js
//  18  SJHH   Sea-Lead Shipping                  sea-lead.js
//  19  SSPH   Seth Shipping                      seth-shipping.js
//  20  TRTR   Track-Trace (fallback aggregator)  track-trace.js
// ─────────────────────────────────────────────────────────────────────────────
var CARRIER_CONFIGS = {};
