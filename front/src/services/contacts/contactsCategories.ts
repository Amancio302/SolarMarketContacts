import api from "../config/api";
import { IContactCategory} from "@/models/ContactCategory";
import { AxiosResponse } from "axios";

interface IRequest {
    name: string,
    tag: string,
}

export async function createContactCategory({name, tag}: IRequest): Promise<AxiosResponse<IContactCategory>> {
    return api.post('/contacts/category', { name, tag }).catch(err => err)
}

export async function listContactCategories(): Promise<AxiosResponse<IContactCategory[]>> {
    return api.get('/contacts/category').catch(err => err)
}

export async function showContactCategory(id: number): Promise<AxiosResponse<IContactCategory>> {
    return api.get(`/contacts/category/${id}`).catch(err => err)
}

export async function updateContactCategory(id: number, {name, tag}: IRequest): Promise<AxiosResponse<IContactCategory>> {
    return api.put(`/contacts/category/${id}`, { name, tag }).catch(err => err)
}

export async function deleteContactCategory(id: number): Promise<AxiosResponse<IContactCategory>> {
    return api.delete(`/contacts/category/${id}`).catch(err => err)
}
