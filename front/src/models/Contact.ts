import { IContactMarker} from './ContactMarker'

export interface IContact {
  id: number;
  value: string;
  contactMarker: IContactMarker;
}
