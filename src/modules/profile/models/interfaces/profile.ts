export interface IProfile {
  id: string;
  tag: string;
  details: IProfileDetails;
  createdDate: string;
  updatedDate: string;
}

export interface IProfileDetails {
  name: string;
  eMail: string;
  phone: string;
  profilePictureUrl: string;
  companyPictureUrl: string;
  phoneRegion: string;
}