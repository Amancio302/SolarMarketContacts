import { IContactMarker} from './ContactMarker'

export interface IContact {
  id: number;
  value: string;
  contactMarker: IContactMarker;
}

export interface IRequestContact {
  id: number;
  value: string;
  contactMarker: number;
  markerTag: string;
  markerName: string;
  contactCategory: number;
  categoryTag: string;
  categoryName: string;
  new: boolean;
  modified: boolean;
}