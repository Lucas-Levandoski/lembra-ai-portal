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
  timezone: string;
  profilePictureUrl: string;
  companyPictureUrl: string;
  phoneRegion: string;
}