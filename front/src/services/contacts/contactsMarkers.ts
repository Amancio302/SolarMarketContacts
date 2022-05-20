import api from "../config/api";
import { IContactMarker} from "@/models/ContactMarker";
import { AxiosResponse } from "axios";

interface IRequest {
    name: string,
    tag: string,
    contactCategory: number
}

export async function createContactMarker({name, tag, contactCategory}: IRequest): Promise<AxiosResponse<IContactMarker>> {
    return api.post('/contacts/marker', { name, tag, contactCategory }).catch(err => err)
}

export async function listContactMarkers(): Promise<AxiosResponse<IContactMarker[]>> {
    return api.get('/contacts/marker').catch(err => err)
}

export async function showContactMarker(id: number): Promise<AxiosResponse<IContactMarker>> {
    return api.get(`/contacts/marker/${id}`).catch(err => err)
}

export async function updateContactMarker(id: number, {name, tag, contactCategory}: IRequest): Promise<AxiosResponse<IContactMarker>> {
    return api.put(`/contacts/marker/${id}`, { name, tag, contactCategory }).catch(err => err)
}

export async function deleteContactMarker(id: number): Promise<AxiosResponse<IContactMarker>> {
    return api.delete(`/contacts/marker/${id}`).catch(err => err)
}
