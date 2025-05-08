'use client';

import { RecursivePartial } from 'Common';
import { getDataFromCEP, patchProfile, uploadCompany, uploadProfile } from 'Profile/services';
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
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [cep, setCep] = useState('');
  const [debouncedCep, setDebouncedCep] = useState<string>();
  const [isCepLoading, setIsCepLoading] = useState(false);

  const {
    profile,
    isProfileLoading, 
    setProfile 
  } = useStore(state => ({ 
    profile: state.profile!, 
    isProfileLoading: state.isProfileLoading,
    setProfile: state.setProfile,
  }));

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedCep(cep.replaceAll(/_|-/g, '')), 2000); // 2 seconds delay

    return () => clearTimeout(timer); // Clear timeout on input change
  }, [cep]);

  // Trigger API call when debounced query changes
  useEffect(() => {
    onReadCep();
  }, [debouncedCep]);

  const onChangeCep = (_cep: string) => {
    setCep(_cep);

    if(_cep.replaceAll(/_|-/g, '').length === 8) setIsCepLoading(true);

    changedProfile.details = {
      ...changedProfile.details,
      postalCode: _cep
    };

    setChangedProfile({ ...changedProfile, details: { ...changedProfile.details } });
  };

  const onReadCep = async () => {
    if(!debouncedCep) return;

    if(debouncedCep.length === 0) {
      changedProfile.details = {
        ... changedProfile.details,
        address: '',
        city: '',
        neighborhood: '',
        state: '',
      };

      setChangedProfile({ ...changedProfile, details: { ...changedProfile.details } });
      if (!hasChanges) setHasChanges(true);
    }

    if(debouncedCep.length !== 8) return;

    try {
      const data = await getDataFromCEP(debouncedCep);

      if(!data) return;

      changedProfile.details = {
        ... changedProfile.details,
        address: data.logradouro,
        city: data.localidade,
        neighborhood: data.bairro,
        state: data.uf,
      };

      if(!profile.details.phoneRegion) changedProfile.details.phoneRegion = data.uf;

      setChangedProfile({ ...changedProfile, details: { ...changedProfile.details } });
      if (!hasChanges) setHasChanges(true);
    } finally {
      setIsCepLoading(false);
    }
    setIsCepLoading(false);
  };

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

    if(file.size > 10_000_000) return toast.error('O arquivo pode ter no máximo 10mb');

    setChangedProfilePicture(file);
    if (!hasChanges) setHasChanges(true);
  };

  const onChangeCompanyPicture = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if(!file) return;

    if(file.size > 15_000_000) return toast.error('O arquivo pode ter no máximo 15mb');

    setChangedCompanyPicture(file);
    if (!hasChanges) setHasChanges(true);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setIsSubmitLoading(true);

    try {
      if(Object.keys(changedProfile).length) {
        if(changedProfile.details?.phone) changedProfile.details.phone = '+55'+changedProfile.details.phone;

        await patchProfile(changedProfile)
          .then(_profile => {
            setProfile(_profile);
            toast.success('Dados atualizados com sucesso');
          });
      }

      if(changedProfilePicture) 
        await uploadProfile(changedProfilePicture)
          .then(() => {
            toast.success('Foto de perfil atualizada com sucesso');
          });

      if(changedCompanyPicture) 
        await uploadCompany(changedCompanyPicture)
          .then(() => {
            toast.success('Foto de capa atualizada com sucesso');
          });

      await refresh();

      setHasChanges(false);
    } finally {
      setIsSubmitLoading(false);
      setChangedProfile({});
      setChangedCompanyPicture(undefined);
      setChangedProfilePicture(undefined);
    }
  };

  const onCancel = () => {
    setChangedProfile({});
    setChangedProfilePicture(undefined);
    setChangedCompanyPicture(undefined);
  };

  return {
    isProfileLoading,
    isCepLoading,
    isSubmitLoading,
    changedProfile,
    profile,
    changedProfilePicture,
    changedCompanyPicture,
    hasChanges,
    onChangeDetails,
    onChangeCep,
    onChangeTag,
    onSubmit,
    onCancel,
    onChangeProfilePicture,
    onChangeCompanyPicture,
  };

}