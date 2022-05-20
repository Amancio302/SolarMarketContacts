import { IContactMarker } from "./ContactMarker";

export interface IContactCategory {
    id: number;
    name: string;
    tag: string;
    contactMarkers?: IContactMarker[]
}
