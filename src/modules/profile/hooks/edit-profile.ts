import { RecursivePartial } from 'Common';
import { patchProfile } from 'Profile';
import { IProfile, IProfileDetails } from 'Profile/models';
import { useStore } from 'Store';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';



export function useEditProfile() {
  const [changedProfile, setChangedProfile] = useState<RecursivePartial<IProfile>>({});
  
  const { 
    profile, 
    isProfileLoading, 
    setProfile 
  } = useStore(state => ({ 
    profile: state.profile, 
    isProfileLoading: state.isProfileLoading,
    setProfile: state.setProfile,
  }));
  

  const tryLeave = (event: BeforeUnloadEvent) => {
    if(changedProfile.tag !== profile?.tag) return event.preventDefault();

    if(changedProfile.details) {
      for(const key in changedProfile.details) {
        if(profile?.details[key as keyof IProfileDetails] !== changedProfile.details[key as keyof IProfileDetails]) 
          return event.preventDefault(); 
      }
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', tryLeave);

    return () => {
      window.removeEventListener('beforeunload', tryLeave);
    };
  },[]);

  const onChangeDetails = (propertyName: keyof IProfileDetails, value: string) => {
    changedProfile.details = {
      ... changedProfile.details,
      [propertyName]: value,
    };

    setChangedProfile({ ...changedProfile, details: { ...changedProfile.details } });
  };

  const onChangeTag = (value: string) => {
    changedProfile.tag = value;

    setChangedProfile({ ...changedProfile });
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await patchProfile(changedProfile)
      .then(_profile => {
        setProfile(_profile);
        toast.success('Dados atualizados com sucesso');
      })
      .catch;
  };

  const onCancel = () => {
    setChangedProfile({});
  };

  return {
    isProfileLoading,
    changedProfile,
    profile,
    onChangeDetails,
    onChangeTag,
    onSubmit,
    onCancel,
  };

}