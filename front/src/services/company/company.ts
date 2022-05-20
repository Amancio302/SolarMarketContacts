import api from "../config/api";
import { ICompany } from "@/models/Company";
import { AxiosResponse } from "axios";

interface IRequest {
    name: string;
}

export async function createCompany({name}: IRequest): Promise<AxiosResponse<ICompany>> {
    return api.post('/company', { name }).catch(err => err)
}

export async function listCompanies(): Promise<AxiosResponse<ICompany[]>> {
    return api.get('/company').catch(err => err)
}

export async function showCompany(id: number): Promise<AxiosResponse<ICompany>> {
    return api.get(`/company/${id}`).catch(err => err)
}

export async function updateCompany(id: number, {name}: IRequest): Promise<AxiosResponse<ICompany>> {
    return api.put(`/company/${id}`, { name }).catch(err => err)
}

export async function deleteCompany(id: number): Promise<AxiosResponse<ICompany>> {
    return api.delete(`/company/${id}`).catch(err => err)
}
