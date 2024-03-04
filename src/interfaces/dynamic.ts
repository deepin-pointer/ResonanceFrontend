export interface PriceRecord {
  goods: number;
  city: number;
  price: number;
}

export interface DynamicData {
  rate: number[][];
  timestamp: Date[][];
}