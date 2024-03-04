import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";
import { City, Goods, StaticData } from "../interfaces/static";

export const useStaticStore = defineStore({
  id: "city",
  state: (): StaticData => ({
    city_list: [],
    goods_list: [],
  }),
  actions: {
    addCity(record: City) {
      if(this.city_list.length!=record.distance.length){
        throw "Mismatch distance count for city";
      }
      record.distance.push(0)
      for(var i=0; i<this.city_list.length; i++){
        this.city_list[i].distance.push(record.distance[i]);
      }
      this.city_list.push(record);
      axios.post<string>(":8000/new_city", record).catch((error) => {
        console.error(error);
      });
    },
    addGoods(record: Goods) {
      this.goods_list.push(record);
      axios.post<string>(":8000/new_goods", record).catch((error) => {
        console.error(error);
      });
    },
    reloadData() {
      return axios
        .get<StaticData>(":8000/static")
        .then((response: AxiosResponse<StaticData>) => {
          this.city_list = response.data.city_list||[];
          this.goods_list = response.data.goods_list||[];
        })
    },
  },
});
