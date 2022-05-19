import api from "../config/api";
import { IContact} from "@/models/Contact";

interface IRequest {
    value: string;
    contactMarker: number;
    person: number;
}

export async function createContact({value, contactMarker, person}: IRequest): Promise<IContact> {
    return api.post('/contacts', { value, contactMarker, person }).catch(err => err)
}

export async function listContacts(): Promise<IContact[]> {
    return api.get('/contacts').catch(err => err)
}

export async function showContact(id: number): Promise<IContact> {
    return api.get(`/contacts/${id}`).catch(err => err)
}

export async function updateContact(id: number, {value, contactMarker, person}: IRequest): Promise<IContact> {
    return api.put(`/contacts/${id}`, { value, contactMarker, person }).catch(err => err)
}

export async function deleteContact(id: number): Promise<IContact> {
    return api.delete(`/contacts/${id}`).catch(err => err)
}
