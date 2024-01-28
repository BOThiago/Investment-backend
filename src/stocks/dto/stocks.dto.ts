export class Stocks {
  companyid: number;
  companyname: string;
  ticker: string;
  price: number;
  p_l: number;
  p_vp: number;
  p_ebit: number;
  p_ativo: number;
  ev_ebit: number;
  margembruta: number;
  margemebit: number;
  margemliquida: number;
  p_sr: number;
  p_capitalgiro: number;
  p_ativocirculante: number;
  giroativos: number;
  roe: number;
  roa: number;
  roic: number;
  dividaliquidapatrimonioliquido: number;
  dividaliquidaebit: number;
  pl_ativo: number;
  passivo_ativo: number;
  liquidezcorrente: number;
  peg_ratio: number;
  receitas_cagr5: number;
  liquidezmediadiaria: number;
  vpa: number;
  lpa: number;
  valormercado: number;
  segmentid: number;
  sectorid: number;
  subsectorid: number;
  subsectorname: string;
  segmentname: string;
  sectorname: string;
}

export class Payout {
  actual: number;
  avg: number;
  avgDifference: number;
  minValue: number;
  minValueRank: number;
  maxValue: number;
  maxValueRank: number;
  actual_F: string;
  avg_F: string;
  avgDifference_F: string;
  minValue_F: string;
  minValueRank_F: string;
  maxValue_F: string;
  maxValueRank_F: string;
  chart: {
    categoryUnique: boolean;
    category: string[];
    series: {
      percentual: {
        value: number;
        value_F: string;
      }[];
      proventos: {
        value: number;
        value_F: string;
        valueSmall_F: string;
      }[];
      lucroLiquido: {
        value: number;
        value_F: string;
        valueSmall_F: string;
      }[];
    };
  };
}

export class Dividend {
  earningsThisYear: string;
  earningsLastYear: string;
  rendiment: string;
  rendimentIsUp: boolean;
  provisionedThisYear: string;
  rendimentWithProvisioned: string;
  rendimentWithProvisionedIsUp: boolean;
  helpers: {
    earningsThisYearHelper: string;
    earningsLastYearHelper: string;
    earningsProvisionedHelper: string;
    earningsMainTextHelper: string;
  };
  assetEarningsModels: {
    y: number;
    m: number;
    d: number;
    ed: string;
    pd: string;
    et: string;
    etd: string;
    v: number;
    sv: string;
    sov: string;
    adj: boolean;
  }[];
  assetEarningsYearlyModels: {
    rank: number;
    value: number;
  }[];
}

export class StocksDTO {
  stocks: Stocks[];
  payout: Payout[];
  dividend: Dividend[];
}
