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
  base: number[];
  count: number[];
}

export interface StaticData {
  city_list: City[];
  goods_list: Goods[];
}
