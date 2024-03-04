export interface TableRow extends Record<string, any> {
  goods_city: string;
  goods: string;
  goods_price: number;
  goods_rate: number;
  goods_trend: boolean;
}

export interface CityDistance {
  city: string;
  distance: number;
}

export interface CityForm {
  name: string;
  note: string;
  distance: CityDistance[];
}

export interface GoodsCityInfo {
  city: string;
  base: number;
}

export interface GoodsForm {
  name: string;
  note: string;
  special: boolean;
  origin: number;
  count: number;
  info: GoodsCityInfo[];
}
