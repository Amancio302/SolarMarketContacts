import { ICompany } from './Company'
import { IContact} from './Contact'

export interface IPerson {
  id: number;
  firstName: string;
  lastName: string;
  birthDate?: Date;
  company?: ICompany;
  contacts: IContact[];
}

export interface IRequestPerson {
  id?: number;
  firstName: string;
  lastName: string;
  birthDate?: Date;
  company?: ICompany;
  contacts?: IContact[];
}