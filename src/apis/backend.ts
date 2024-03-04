import axios, { AxiosResponse } from "axios";
import { City, Goods, StaticData } from "../interfaces/static";
import { PriceRecord } from "../interfaces/dynamic";

export function getDynamicData(): Promise<AxiosResponse<ArrayBuffer>>{
    return axios.get<ArrayBuffer>("/dynamic")
}

export function getStaticData(): Promise<AxiosResponse<StaticData>>{
    return axios.get<StaticData>("/static")
}

export function postNewCity(record: City): Promise<AxiosResponse<string>>{
    return axios.post<string>("/new_city", record)
}

export function postNewGoods(record: Goods): Promise<AxiosResponse<string>>{
    return axios.post<string>("/new_goods", record)
}

export function postPrice(record: PriceRecord): Promise<AxiosResponse<string>>{
    return axios.post<string>("/report_price", record)
}