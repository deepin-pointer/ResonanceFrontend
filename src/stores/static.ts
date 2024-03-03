import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";

interface City {
  name: string;
  note: string;
  distance: number[];
}

interface Goods {
  name: string;
  note: string;
  special: boolean;
  origin: number;
  base: number[];
}

interface StaticData {
  city_list: City[];
  goods_list: Goods[];
}

export const useStaticStore = defineStore({
  id: "city",
  state: (): StaticData => ({
    city_list: [],
    goods_list: [],
  }),
  actions: {
    addCity(record: City) {
      this.city_list.push(record);
      axios.post<string>("/new_city", record).catch((error) => {
        console.error(error);
      });
    },
    addGoods(record: Goods) {
      this.goods_list.push(record);
      axios.post<string>("/new_goods", record).catch((error) => {
        console.error(error);
      });
    },
    reloadData() {
      axios
        .get<StaticData>("/static")
        .then((response: AxiosResponse<StaticData>) => {
          this.city_list = response.data.city_list;
          this.goods_list = response.data.goods_list;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});