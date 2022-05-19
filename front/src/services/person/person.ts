import { AxiosResponse } from "axios";
import api from "../config/api";
import { IPerson } from "@/models/Person";

interface IRequest {
    firstName: string;
    lastName: string;
    birthDate: Date;
    company: number;
}

export async function createPerson({firstName, lastName, birthDate, company}: IRequest): Promise<AxiosResponse<IPerson>> {
    return api.post('/person', { firstName, lastName, birthDate, company }).catch(err => err)
}

export async function listPeople(): Promise<AxiosResponse<IPerson[]>> {
    return api.get('/person').catch(err => err)
}

export async function showPerson(id: number): Promise<IPerson> {
    return api.get(`/person/${id}`).catch(err => err)
}

export async function updatePerson(id: number, {firstName, lastName, birthDate, company}: IRequest): Promise<IPerson> {
    return api.put(`/person/${id}`, { firstName, lastName, birthDate, company }).catch(err => err)
}

export async function deletePerson(id: number): Promise<IPerson> {
    return api.delete(`/person/${id}`).catch(err => err)
}
