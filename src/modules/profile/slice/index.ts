import { StateCreator } from 'zustand';
import { ProfileSlice } from 'Profile/models';

export const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
  isProfileLoading: true,
  profile: undefined,
  shortPforile: undefined,

  setProfile: (profile) => set({profile}),
  setShortProfile: (shortProfile) => set({shortProfile}),
  setIsProfileLoading: (isProfileLoading) => set({ isProfileLoading }),
});