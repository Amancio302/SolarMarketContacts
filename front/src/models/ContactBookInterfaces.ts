import { IPerson } from "./Person";

export interface IBookedPerson {
    person: IPerson;
    active: boolean;
    index: number;
}