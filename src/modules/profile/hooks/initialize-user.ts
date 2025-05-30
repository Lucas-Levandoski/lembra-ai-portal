'use client';

import { readMyProfile } from 'Profile/services';
import { useEffect } from 'react';
import { useStore } from 'Store';


export function useInitializeUser(shouldInitialize = true) {
  const {
    setProfile,
    setIsProfileLoading,
  } = useStore(state => ({ 
    setProfile: state.setProfile,
    setIsProfileLoading: state.setIsProfileLoading
  }));

  useEffect(() => {
    if(shouldInitialize) loadProfileData();
  }, []);

  const loadProfileData = async (shouldLoad = true) => {
    if(shouldLoad) setIsProfileLoading(true);

    await readMyProfile()
      .then(async (profile) => setProfile(profile))
      .finally(() => {
        if(shouldLoad) setIsProfileLoading(false);
      });
  };

  const refresh = async () => {
    loadProfileData(false);
  };

  return {
    refresh,
  };
}