'use client';

import { Button, CirclyingFourDotsLoading, ErrorMessage, Select, Option } from 'Common';
import { PhoneRegionOptions } from 'Profile';
import { useEditProfile } from 'Profile/hooks';
import Image from 'next/image';
import { BiTrash } from 'react-icons/bi';

export function ProfileView() {
  const { 
    profile,
    changedProfile, 
    isProfileLoading, 
    onChangeDetails, 
    onSubmit, 
    onCancel, 
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
            <div className="flex items-center justify-start gap-4">
              {
                profile.details.profilePictureUrl && (
                  <>
                    <Image 
                      className="rounded-full" 
                      height={120} 
                      width={120} 
                      src={changedProfile.details?.profilePictureUrl !== undefined ? changedProfile.details?.profilePictureUrl : profile.details.profilePictureUrl} 
                      alt="profile" />
                    <Button variant="outlined">Atualizar</Button>
                    <Button variant="icon" className="gap-2"><BiTrash /> Remover</Button>
                  </>
                )
              }
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
                <textarea className="p-2 border-2 border-gray-200 h-40 rounded-lg" id="welcoming" value="Seja muito bem vindo"/>
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
                <Button variant="secondary" onClick={() => onCancel()}>Cancelar</Button>
                <Button type="submit">Salvar Alterações</Button>
              </div>
            </form>
          </div>
        )
      }
    </div>
  );
}