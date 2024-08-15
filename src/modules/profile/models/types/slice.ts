import { IProfile, IShortProfile } from '../interfaces';

export type ProfileSlice = {
  profile?: IProfile,
  shortProfile?: IShortProfile,
  isProfileLoading: boolean,

  setProfile: (profile?: IProfile) => void,
  setShortProfile: (profile?: IShortProfile) => void,
  setIsProfileLoading: (isProfileLoading: boolean) => void,
}