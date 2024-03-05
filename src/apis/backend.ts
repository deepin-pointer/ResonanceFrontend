import axios, { AxiosResponse } from "axios";
import { City, Goods, StaticData } from "../interfaces/static";
import { PriceRecord } from "../interfaces/dynamic";

export function getDynamicData(): Promise<AxiosResponse<ArrayBuffer>>{
    return axios.get<ArrayBuffer>("http://127.0.0.1:8000/dynamic")
}

export function getStaticData(): Promise<AxiosResponse<StaticData>>{
    return axios.get<StaticData>("http://127.0.0.1:8000/static")
}

export function postNewCity(record: City): Promise<AxiosResponse<string>>{
    return axios.post<string>("http://127.0.0.1:8000/new_city", record)
}

export function postNewGoods(record: Goods): Promise<AxiosResponse<string>>{
    return axios.post<string>("http://127.0.0.1:8000/new_goods", record)
}

export function postPrice(record: PriceRecord): Promise<AxiosResponse<string>>{
    return axios.post<string>("http://127.0.0.1:8000/report_price", record)
}