'use client';

import { Button, CirclyingFourDotsLoading, ErrorMessage, Select, Option, envVars } from 'Common';
import { PhoneRegionOptions } from 'Profile/models';
import { useEditProfile } from 'Profile/hooks';
import { BiEditAlt } from 'react-icons/bi';
import Image from 'next/image';

export function ProfileView() {
  const { 
    profile,
    changedProfile, 
    isProfileLoading, 
    changedProfilePicture,
    hasChanges,
    onChangeDetails, 
    onSubmit, 
    onCancel, 
    onChangeProfilePicture,
  } = useEditProfile();

  return (
    <div className="min-w-[600px]">
      {
        isProfileLoading && (
          <CirclyingFourDotsLoading />
        )
      }
      {
        !isProfileLoading && !profile && <ErrorMessage message="Falha ao carregar informações de usuário" />
      }
      {
        !isProfileLoading && profile && profile.details && (
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-center gap-4">    
              <div className="rounded-full overflow-hidden h-fit w-fit relative group">
                {
                  changedProfilePicture 
                    ? (
                      <Image
                        height={60}
                        width={60}
                        src={URL.createObjectURL(changedProfilePicture)}
                        alt="profile" 
                      />
                    )
                    : (
                      <Image
                        height={60}
                        width={60}
                        src={
                          profile.details.profilePictureUrl
                            ? `${envVars.saProfilesUrl}/${profile.details.profilePictureUrl}`
                            : `${envVars.saAssetsUrl}/user_placeholder.png`
                        }
                        alt="profile" 
                      />
                    )
                }
                <div className="flex justify-center items-center absolute left-0 w-full h-full bg-gray-500 top-0 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-70">
                  <BiEditAlt className="margin-auto size-10 text-black"/>
                </div>
                <input className="h-full w-full opacity-0 absolute left-0 top-0 cursor-pointer" type="file" onChange={onChangeProfilePicture}/>
              </div>
            </div>
            <form className="flex flex-col gap-8" onSubmit={onSubmit}>
              <div className="flex w-full flex-col gap-2">
                <label className="text-lg font-bold" htmlFor="name">Nome</label>
                <input 
                  className="p-2 border-2 border-gray-200 h-12 rounded-lg"
                  id="name"
                  onChange={(event) => onChangeDetails('name', event.target.value)} 
                  value={changedProfile.details?.name !== undefined ? changedProfile.details?.name : profile.details.name}/>
              </div>
              <div className="flex w-full flex-col gap-2">
                <label className="text-lg font-bold" htmlFor="welcoming">Mensagem de boas-vindas</label>
                <textarea className="p-2 border-2 border-gray-200 h-40 rounded-lg" id="welcoming" value="Seja muito bem vindo" onChange={console.info}/>
              </div>
              <div className="flex w-full flex-col gap-2">
                <label htmlFor="phone-region" className="text-lg font-bold">Região do Telefone</label>
                <Select 
                  className="w-16"
                  id="phone-region" 
                  value={changedProfile.details?.phoneRegion !== undefined ? changedProfile.details?.phoneRegion : profile.details.phoneRegion}
                  onChange={value => onChangeDetails('phoneRegion', value)}
                >
                  {
                    PhoneRegionOptions.map(option => (
                      <Option key={`phone-region-${option.value}`} value={option.value}>
                        <div className="mx-auto font-normal">{option.key}</div>
                      </Option>
                    ))
                  }
                </Select>
              </div>
              <div className="flex justify-between">
                <Button disabled={!hasChanges} variant="secondary" onClick={() => onCancel()}>Cancelar</Button>
                <Button disabled={!hasChanges} type="submit">Salvar Alterações</Button>
              </div>
            </form>
          </div>
        )
      }
    </div>
  );
}