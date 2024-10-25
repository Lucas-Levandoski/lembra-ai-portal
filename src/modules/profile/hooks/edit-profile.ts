import { RecursivePartial } from 'Common';
import { patchProfile, uploadCompany, uploadProfile } from 'Profile';
import { IProfile, IProfileDetails } from 'Profile/models';
import { useStore } from 'Store';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useInitializeUser } from './initialize-user';



export function useEditProfile() {
  const { refresh } = useInitializeUser(false);

  const [changedProfile, setChangedProfile] = useState<RecursivePartial<IProfile>>({});
  const [changedProfilePicture, setChangedProfilePicture] = useState<File | undefined>();
  const [changedCompanyPicture, setChangedCompanyPicture] = useState<File | undefined>();
  const [hasChanges, setHasChanges] = useState(false);

  
  const { 
    profile, 
    isProfileLoading, 
    setProfile 
  } = useStore(state => ({ 
    profile: state.profile!, 
    isProfileLoading: state.isProfileLoading,
    setProfile: state.setProfile,
  }));
  

  const tryLeave = (event: BeforeUnloadEvent) => {
    if(changedProfile.tag !== profile.tag) return event.preventDefault();

    if(changedProfile.details) {
      for(const key in changedProfile.details) {
        if(profile.details[key as keyof IProfileDetails] !== changedProfile.details[key as keyof IProfileDetails]) 
          return event.preventDefault(); 
      }
    }
  };

  useEffect(() => {
    // window.addEventListener('beforeunload', tryLeave);

    // return () => {
    //   window.removeEventListener('beforeunload', tryLeave);
    // };
  },[]);

  const onChangeDetails = (propertyName: keyof IProfileDetails, value: string) => {
    changedProfile.details = {
      ... changedProfile.details,
      [propertyName]: value,
    };

    setChangedProfile({ ...changedProfile, details: { ...changedProfile.details } });
    if (!hasChanges) setHasChanges(true);
  };

  const onChangeTag = (value: string) => {
    changedProfile.tag = value;

    setChangedProfile({ ...changedProfile });

    if (!hasChanges) setHasChanges(true);
  };

  const onChangeProfilePicture = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if(!file) return;

    setChangedProfilePicture(file);
    if (!hasChanges) setHasChanges(true);
  };

  const onChangeCompanyPicture = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if(!file) return;

    setChangedCompanyPicture(file);
    if (!hasChanges) setHasChanges(true);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if(Object.keys(changedProfile).length)
      await patchProfile(changedProfile)
        .then(_profile => {
          setProfile(_profile);
          setChangedProfile({});
          toast.success('Dados atualizados com sucesso');
        });

    if(changedProfilePicture) 
      await uploadProfile(changedProfilePicture)
        .then(() => {
          setChangedProfilePicture(undefined);
          toast.success('Foto de perfil atualizada com sucesso');
        });

    if(changedCompanyPicture) 
      await uploadCompany(changedCompanyPicture)
        .then(() => {
          setChangedCompanyPicture(undefined);
          toast.success('Foto de capa atualizada com sucesso');
        });

    await refresh();

    setHasChanges(false);
  };

  const onCancel = () => {
    setChangedProfile({});
    setChangedProfilePicture(undefined);
  };

  return {
    isProfileLoading,
    changedProfile,
    profile,
    changedProfilePicture,
    changedCompanyPicture,
    hasChanges,
    onChangeDetails,
    onChangeTag,
    onSubmit,
    onCancel,
    onChangeProfilePicture,
    onChangeCompanyPicture,
  };

}