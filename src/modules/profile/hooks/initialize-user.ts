import { readMyProfile } from 'Profile';
import { useStore } from 'Store';


export function useInitializeUser(shouldInitialize = true) {
  const {
    setProfile,
    setIsProfileLoading,
  } = useStore(state => ({ 
    setProfile: state.setProfile,
    setIsProfileLoading: state.setIsProfileLoading
  }));

  const onInitialize = async () => {
    if(!shouldInitialize) return;

    loadProfileData();
  };

  const loadProfileData = async (shouldLoad = true) => {
    if(shouldLoad) setIsProfileLoading(true);


    await readMyProfile()
      .then(async (profile) => setProfile(profile))
      .finally(() => setIsProfileLoading(false));
  };

  const refresh = async () => {
    loadProfileData(false);
  };

  return {
    onInitialize,
    refresh,
  };
}