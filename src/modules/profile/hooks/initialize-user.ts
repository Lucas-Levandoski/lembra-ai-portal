import { readMyProfile } from 'Profile';
import { useStore } from 'Store';


export function useInitializeUser() {
  const {
    setProfile,
    setIsProfileLoading,
  } = useStore(state => ({ 
    setProfile: state.setProfile,
    setIsProfileLoading: state.setIsProfileLoading
  }));

  const onInitilalize = async () => {
    setIsProfileLoading(true);

    await readMyProfile()
      .then(async (profile) => setProfile(profile))
      .finally(() => setIsProfileLoading(false));
  };

  return {
    onInitilalize,
  };
}