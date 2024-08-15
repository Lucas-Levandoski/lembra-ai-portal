export interface IProfile {
  id: string;
  tag: string;
  details: {
    name: string;
    eMail: string;
    phone: string;
    profilePictureUrl: string;
    companyPictureUrl: string;
    phoneRegion: string;
  };
  createdDate: string;
  updatedDate: string;
}