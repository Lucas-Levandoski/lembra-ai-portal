import { IShortProfile } from '../interfaces';

export type ProfileSlice = {
  profile?: IShortProfile,
  isProfileLoading: boolean,

  setProfile: (profile?: IShortProfile) => void,
  setIsProfileLoading: (isProfileLoading: boolean) => void,
}