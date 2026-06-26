// Carriers shown in the fallback picker. The front end only needs name + SCAC — the
// prefix/container-prefix data and carrier detection live entirely in the extension.
// Keep the SCAC codes in sync with chrome-extension/carriers/*.js.
export interface Carrier {
  name: string;
  scac: string;
}

export const CARRIERS: Carrier[] = [
  { name: 'ONE Line',            scac: 'ONEY' },
  { name: 'MSC',                 scac: 'MSCU' },
  { name: 'OOCL',                scac: 'OOLU' },
  { name: 'Evergreen',           scac: 'EGLV' },
  { name: 'CMA-CGM',             scac: 'CMDU' },
  { name: 'Maersk',              scac: 'MAEU' },
  { name: 'HMM',                 scac: 'HDMU' },
  { name: 'Hapag-Lloyd',         scac: 'HLCU' },
  { name: 'COSCO',               scac: 'COSU' },
  { name: 'Wan Hai',             scac: 'WHLC' },
  { name: 'Yang Ming',           scac: 'YMLU' },
  { name: 'Emirates Line',       scac: 'EMIU' },
  { name: 'ZIM',                 scac: 'ZIMU' },
  { name: 'SM Line',             scac: 'SMLU' },
  { name: 'HEDE Hong Kong',      scac: 'HDUJ' },
  { name: 'PIL',                 scac: 'PABV' },
  { name: 'Sea-Lead',            scac: 'SJHH' },
  { name: 'Seth Shipping',       scac: 'SSPH' },
  { name: 'Vanguard Logistics',  scac: 'VSLG' },
];
