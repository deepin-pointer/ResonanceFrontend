import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";

// interface PriceRecord {
//     goods: number;
//     city: number;
//     price: number;
// }

export const useDynamicStore = defineStore({
  id: "city",
  state: (): {
    rate: number[][];
    timestamp: Date[][];
  } => ({
    rate: [],
    timestamp: [],
  }),
  actions: {
    changeValue(row: number, column: number, value: number) {
      this.rate[row][column] = value;
      this.rate[row][column] = Date.now();
      axios
        .post<string>("/report_price", {
          goods: row,
          city: column,
          price: value,
        })
        .catch((error) => {
          console.error(error);
        });
    },
    reloadData(rows: number, columns: number) {
      axios
        .get<ArrayBuffer>("/dynamic")
        .then((response: AxiosResponse<ArrayBuffer>) => {
          if (response.data.byteLength != rows * columns * 16) {
            console.error(
              `Data size mismatch, expecting ${rows * columns * 16}, but got ${
                response.data.byteLength
              }.`
            );
            return;
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
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
