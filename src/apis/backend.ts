import axios, { AxiosResponse } from "axios";
import jsSHA from "jssha";
import { City, Goods, StaticData } from "../interfaces/static";
import { LoginResult } from "../interfaces/storage";
import { PriceRecord } from "../interfaces/dynamic";

export function getDynamicData(): Promise<AxiosResponse<ArrayBuffer>>{
    return axios.get<ArrayBuffer>("/api/dynamic", {responseType: "arraybuffer"})
}

export function getStaticData(): Promise<AxiosResponse<StaticData>>{
    return axios.get<StaticData>("/api/static")
}

export function login(user: string, password: string): Promise<AxiosResponse<LoginResult>>{
    const shaObj = new jsSHA("SHA3-512", "TEXT", { encoding: "UTF8" });
    const formData = new FormData()
    formData.append('user', user);
    formData.append('hash', shaObj.update(password).getHash("HEX"));
    return axios.post<LoginResult>("/api/login", formData)
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