import { ICompany } from "./Company";
import { IContactMarker } from "./ContactMarker";

export interface IStoreCategories {
    id: number;
    tag: string;
    name: string;
    markers: IContactMarker[]
}

export interface IMarkers {
    PHONE: IStoreCategories;
    EMAIL: IStoreCategories;
}

export interface IStore {
    companiesList: ICompany[];
    markersList: IMarkers;
}
