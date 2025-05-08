import { IConnections } from './connections';

export interface IProfile {
  id: string;
  tag: string;
  details: IProfileDetails;
  connections: IConnections;
  createdDate: string;
  updatedDate: string;
}

export interface IProfileDetails {
  name: string;
  email: string;
  phone: string;
  profilePictureUrl: string;
  companyPictureUrl: string;
  phoneRegion: string;
  timezone: string;
  cpfCnpj: string;
  postalCode: string;
  address: string;
  addressNumber: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}