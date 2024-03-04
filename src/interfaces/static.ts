export interface City {
  name: string;
  note: string;
  distance: number[];
}

export interface Goods {
  name: string;
  note: string;
  special: boolean;
  origin: number;
  count: number;
  base: number[];
}

export interface StaticData {
  city_list: City[];
  goods_list: Goods[];
}
