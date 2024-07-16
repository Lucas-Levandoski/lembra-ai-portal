import { StateCreator } from 'zustand';
import { ProfileSlice } from 'Profile';

export const createProfileSlice: StateCreator<ProfileSlice> = (set) => ({
  isProfileLoading: false,
  profile: undefined,

  setProfile: (profile) => set({profile}),
  setIsProfileLoading: (isProfileLoading) => set({ isProfileLoading }),
});