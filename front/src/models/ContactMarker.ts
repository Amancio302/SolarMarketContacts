import { IContactCategory } from "./ContactCategory";

export interface IContactMarker {
    id: number;
    name: string;
    tag: string;
    contactCategory: IContactCategory;
}
