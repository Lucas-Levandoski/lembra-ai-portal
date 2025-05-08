export interface IShortProfile {
  id: string;
  tag: string;
  name: string;
  email: string;
  timezone: string;
  profilePictureUrl?: string;
  companyPictureUrl?: string;
  whatsappConnection: {
    phoneNumber?: string,
    isConnected: boolean,
  }
}