import { defineStore } from "pinia";
import { postPrice, getDynamicData } from "../apis/backend";
import { DynamicData } from "../interfaces/dynamic"

export const useDynamicStore = defineStore({
  id: "dynamic",
  state: (): DynamicData => ({
    rate: [],
    timestamp: [],
  }),
  actions: {
    changeValue(row: number, column: number, value: number) {
      this.rate[row][column] = value;
      this.rate[row][column] = Date.now();
      postPrice({
          goods: row,
          city: column,
          price: value,
        })
        .catch((error) => {
          console.error(error);
        });
    },
    reloadData(rows: number, columns: number) {
      return getDynamicData().then((response) => {
          if (response.data.byteLength > rows * columns * 16) {
            throw "Dynamic data size error";
          }
          const data = new BigInt64Array(response.data);
          for (let i = 0; i < rows; i++) {
            if (this.rate.length <= i) {
              this.rate.push([]);
              this.timestamp.push([]);
            }
            for (let j = 0; j < columns; j++) {
              const rateValue = Number(data[i * columns + j]);
              const dateValue = new Date(
                Number(data[rows * columns + i * columns + j] * BigInt(1000))
              );
              if (this.rate[i].length <= j) {
                this.rate[i].push(rateValue);
                this.timestamp[i].push(dateValue);
              } else {
                this.rate[i][j] = rateValue;
                this.timestamp[i][j] = dateValue;
              }
            }
          }
        });
    },
  },
});
