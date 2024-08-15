import { StateCreator } from 'zustand';
import { ProfileSlice } from 'Profile';

export const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
  isProfileLoading: false,
  profile: undefined,
  shortPforile: undefined,

  setProfile: (profile) => set({profile}),
  setShortProfile: (shortProfile) => set({shortProfile}),
  setIsProfileLoading: (isProfileLoading) => set({ isProfileLoading }),
});