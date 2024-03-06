import axios, { AxiosResponse } from "axios";
import { City, Goods, StaticData } from "../interfaces/static";
import { PriceRecord } from "../interfaces/dynamic";

export function getDynamicData(): Promise<AxiosResponse<ArrayBuffer>>{
    return axios.get<ArrayBuffer>("/api/dynamic", {responseType: "arraybuffer"})
}

export function getStaticData(): Promise<AxiosResponse<StaticData>>{
    return axios.get<StaticData>("/api/static")
}

export function postNewCity(record: City): Promise<AxiosResponse<string>>{
    return axios.post<string>("/api/new_city", record)
}

export function postNewGoods(record: Goods): Promise<AxiosResponse<string>>{
    return axios.post<string>("/api/new_goods", record)
}

export function postPrice(record: PriceRecord): Promise<AxiosResponse<string>>{
    return axios.post<string>("/api/report_price", record)
}