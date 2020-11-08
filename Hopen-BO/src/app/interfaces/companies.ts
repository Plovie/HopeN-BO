export interface CompaniesInterface {
  uid: string;
  name:string;
  phone:string[];
  address: any;
  categories: string;
  web?:string;
  socialNetwork?:string[];
  service:string;
  referentEmail:string;
  logo?:string[];
  picture:string[];
  openTime?:{hour:string, minute: string},
  closeTime?:{hour:string, minute: string},
  pdf?:any;
}
