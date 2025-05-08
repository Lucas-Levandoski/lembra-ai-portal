'use client';

import { Button, CirclingFourDotsLoading, ErrorMessage, Select, Option, BouncingThreeDotsLoading } from 'Common';
import { TimezoneOptions } from 'Profile/models';
import { useEditProfile } from 'Profile/hooks';
import InputMask from 'react-input-mask';
import { ProfilePictureEditable } from 'Profile/components';
import { preferFirst } from 'Profile/utils';

export function ProfileView() {
  const { 
    profile,
    changedProfile, 
    isProfileLoading,
    isSubmitLoading,
    isCepLoading,
    changedProfilePicture,
    hasChanges,
    onChangeDetails, 
    onSubmit, 
    onCancel, 
    onChangeProfilePicture,
    onChangeCep,
  } = useEditProfile();

  return (
    <div className="w-[740px] px-5 overflow-y-auto">
      {
        isProfileLoading && (
          <CirclingFourDotsLoading />
        )
      }
      {
        !isProfileLoading && !profile && <ErrorMessage message="Falha ao carregar informações de usuário" />
      }
      {
        !isProfileLoading && profile && profile.details && (
          <div className="flex flex-col gap-8">
            <ProfilePictureEditable onChangeProfilePicture={onChangeProfilePicture} profile={profile} changedProfilePicture={changedProfilePicture} />
            <form className="flex flex-col gap-8" onSubmit={onSubmit}>
              <div className="flex w-full flex-col gap-2">
                <label className="text-lg font-bold" htmlFor="name">Nome</label>
                <input
                  className="p-2 border-2 border-gray-200 h-12 rounded-lg"
                  id="name"
                  onChange={(event) => onChangeDetails('name', event.target.value)}
                  value={preferFirst(changedProfile.details?.name, profile.details.name)}/>
              </div>
              <div className="flex w-full flex-col gap-2">
                <label className="text-lg font-bold" htmlFor="welcoming">Mensagem de boas-vindas</label>
                <textarea className="p-2 border-2 border-gray-200 h-40 rounded-lg" id="welcoming" value="Seja muito bem vindo" onChange={console.info}/>
              </div>
              <div className="flex justify-between">
                {/* <div className="flex w-1/2 flex-col gap-2">
                  <label htmlFor="phone-region" className="text-lg font-bold">Região do Telefone</label>
                  <Select
                    className="w-16"
                    id="phone-region" 
                    value={changedProfile.details?.phoneRegion || profile.details.phoneRegion}
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
                </div> */}
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-bold" htmlFor="phone">Celular</label>
                  <InputMask
                    mask="(99) 99999-9999"
                    type="tel"
                    className="p-2 border-2 border-gray-200 h-12 rounded-lg"
                    id="phone"
                    value={preferFirst(changedProfile.details?.phone, profile.details?.phone)}
                    onChange={event => onChangeDetails('phone', event.target.value)} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="timezone" className="text-lg font-bold">Fuso Horário</label>
                  <Select
                    className="w-64"
                    id="timezone" 
                    value={preferFirst(changedProfile.details?.timezone, profile.details?.timezone)}
                    onChange={value => onChangeDetails('timezone', value)}
                  >
                    {
                      TimezoneOptions.map(option => (
                        <Option key={`timezone-${option.value}`} value={option.value}>
                          <div className="mx-auto font-normal">{option.key}</div>
                        </Option>
                      ))
                    }
                  </Select>
                </div>
              </div>
              <hr />
              <div className="flex flex-wrap justify-between">
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-bold" htmlFor="email">E-mail</label>
                  <input
                    className="p-2 border-2 border-gray-200 h-12 rounded-lg"
                    id="email"
                    disabled
                    value={profile.details.email}/>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-bold" htmlFor="cpfCnpj">CPF/CNPJ</label>
                  <InputMask
                    mask="999.999.999-99"
                    type="tel"
                    className="p-2 border-2 border-gray-200 h-12 rounded-lg"
                    id="cpfCnpj"
                    value={preferFirst(changedProfile.details?.cpfCnpj, profile.details?.cpfCnpj)}
                    onChange={event => onChangeDetails('cpfCnpj', event.target.value)} />
                </div>
              </div>
              <div className="flex flex-wrap gap-3 justify-between">
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-bold" htmlFor="postalCode">CEP</label>
                  <InputMask
                    mask="99999-999"
                    type="tel"
                    className="p-2 w-28 border-2 border-gray-200 h-12 rounded-lg"
                    id="postalCode"
                    value={preferFirst(changedProfile.details?.postalCode, profile.details?.postalCode)}
                    onChange={event => onChangeCep(event.target.value)} />
                </div>
                <div className="flex flex-col relative gap-2">
                  { isCepLoading && <BouncingThreeDotsLoading className="top-auto bottom-1" shouldFloatMiddle /> }
                  <label className="text-lg font-bold" htmlFor="state">Estado</label>
                  <input
                    className="p-2 w-16 border-2 border-gray-200 h-12 rounded-lg"
                    id="state"
                    disabled
                    value={preferFirst(changedProfile.details?.state, profile.details?.state)}/>
                </div>
                <div className="flex flex-col gap-2 relative w-auto">
                  { isCepLoading && <BouncingThreeDotsLoading className="top-auto bottom-1" shouldFloatMiddle /> }
                  <label className="text-lg font-bold" htmlFor="city">Cidade</label>
                  <input
                    className="w-80 p-2 border-2 border-gray-200 h-12 rounded-lg"
                    id="city"
                    disabled
                    value={preferFirst(changedProfile.details?.city, profile.details?.city)}/>
                </div>
                <div className="flex flex-col gap-2 relative">
                  { isCepLoading && <BouncingThreeDotsLoading className="top-auto bottom-1" shouldFloatMiddle /> }
                  <label className="text-lg font-bold" htmlFor="neighborhood">Bairro</label>
                  <input
                    className="p-2 border-2 border-gray-200 h-12 rounded-lg overflow-auto"
                    id="neighborhood"
                    disabled
                    value={preferFirst(changedProfile.details?.neighborhood, profile.details?.neighborhood)}/>
                </div>
                <div className="flex flex-col gap-2 relative">
                  { isCepLoading && <BouncingThreeDotsLoading className="top-auto bottom-1" shouldFloatMiddle /> }
                  <label className="text-lg font-bold" htmlFor="address">Endereço</label>
                  <input
                    className="w-96 p-2 min-w-40 border-2 border-gray-200 h-12 rounded-lg overflow-auto"
                    id="address"
                    disabled
                    value={preferFirst(changedProfile.details?.address, profile.details?.address)}/>
                </div>
                <div className="flex flex-col gap-2 w-auto">
                  <label className="text-lg font-bold" htmlFor="complement">Complemento</label>
                  <input
                    className="w-40 p-2 border-2 border-gray-200 h-12 rounded-lg"
                    id="complement"
                    value={preferFirst(changedProfile.details?.complement, profile.details?.complement)}
                    onChange={event => onChangeDetails('complement', event.target.value)}/>
                </div>
              </div>
              <div className="flex justify-between">
                <Button disabled={!hasChanges || isSubmitLoading} variant="secondary" onClick={() => onCancel()}>Cancelar</Button>
                <Button disabled={!hasChanges || isSubmitLoading} type="submit">
                  {
                    isSubmitLoading
                      ? <BouncingThreeDotsLoading />
                      : <>Salvar Alterações</>
                  }
                </Button>
              </div>
            </form>
          </div>
        )
      }
    </div>
  );
}