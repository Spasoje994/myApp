import { Office } from './office';

export interface Employee {
  id: number;
  name: string;
  surname: string;
  phone: string[];
  office: Office;
}
