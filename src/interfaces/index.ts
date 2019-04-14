export interface IPersonBase {
  name: string;
  gender: number;
  id: number;
}

export interface IPerson {
  id?: number;
  gender: number;
  last_name: string;
  first_name: string;
  email: string;
  create_on?: string;
  update_on?: string;
}
