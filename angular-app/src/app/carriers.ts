// AUTO-GENERATED from chrome-extension/carriers/*.js — keep in sync with the extension.
export interface Carrier {
  name: string;
  scac: string;
  prefixes: string[];
  containerPrefixes: string[];
}

export const CARRIERS: Carrier[] = [
  { name: "ONE Line", scac: "ONEY", prefixes: ["ONEY"], containerPrefixes: ["ONEU","NYKU","MOLU","MOAU","KKLU","KKFU"] },
  { name: "MSC", scac: "MSCU", prefixes: ["MSCU","MEDU","MSCW"], containerPrefixes: ["MSCU","MEDU","MSDU","MSMU","MSNU"] },
  { name: "OOCL", scac: "OOLU", prefixes: ["OOLU","OOCL"], containerPrefixes: ["OOLU","OOCU"] },
  { name: "Evergreen", scac: "EGLV", prefixes: ["EGLV"], containerPrefixes: ["EGHU","EGSU","EISU","EITU","EMCU","HMCU","IMTU","LTIU","UGMU"] },
  { name: "CMA-CGM", scac: "CMDU", prefixes: ["CMDU","CGMU"], containerPrefixes: ["CMAU","CGMU","CMCU","CXDU","CXRU","ECMU","APLU","APRU","APHU","APZU","ANLU","CNCU"] },
  { name: "Maersk", scac: "MAEU", prefixes: ["MAEU","MRKU","MSKU"], containerPrefixes: ["MAEU","MSKU","MRKU","MRSU","MHHU","MNBU","MGLU","MVIU","MCAU","MWCU","MIEU","MSAU","PONU","SEAU","SLLU","SEKU","SAFU"] },
  { name: "HMM", scac: "HDMU", prefixes: ["HDMU","HYDA"], containerPrefixes: ["HDMU","HMMU","HAMU"] },
  { name: "Hapag-Lloyd", scac: "HLCU", prefixes: ["HLCU","HLXU"], containerPrefixes: ["HLBU","HLXU","HPLU","HLCU","UACU"] },
  { name: "COSCO", scac: "COSU", prefixes: ["COSU","COSE"], containerPrefixes: ["COSU","CBHU","CCLU","CSNU","CSLU","CBXU"] },
  { name: "Wan Hai", scac: "WHLC", prefixes: ["WHLC"], containerPrefixes: ["WHLU","WHSU","TPCU"] },
  { name: "Yang Ming", scac: "YMLU", prefixes: ["YMLU","YMJA"], containerPrefixes: ["YMLU","YMMU"] },
  { name: "Emirates Line", scac: "EMIU", prefixes: ["EMIV","EMIU","ESPU"], containerPrefixes: ["ESPU","ESDU"] },
  { name: "ZIM", scac: "ZIMU", prefixes: ["ZIMU"], containerPrefixes: ["ZIMU","ZCSU","ZCLU","JXLU"] },
  { name: "SM Line", scac: "SMLU", prefixes: ["SMLM"], containerPrefixes: ["SMCU"] },
  { name: "HEDE Hong Kong", scac: "HDUJ", prefixes: ["HDUJ"], containerPrefixes: ["HDUJ"] },
  { name: "PIL", scac: "PABV", prefixes: ["PABV"], containerPrefixes: ["PCIU"] },
  { name: "Sea-Lead", scac: "SJHH", prefixes: ["SJHH"], containerPrefixes: [] },
  { name: "Seth Shipping", scac: "SSPH", prefixes: ["SSPH"], containerPrefixes: [] },
  { name: "Vanguard Logistics", scac: "VSLG", prefixes: ["VSLG"], containerPrefixes: [] },
  { name: "Track-Trace", scac: "TRTR", prefixes: [], containerPrefixes: [] },
];
