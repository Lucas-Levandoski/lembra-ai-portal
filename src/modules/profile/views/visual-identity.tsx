'use client';

import { BouncingThreeDotsLoading, Button, CirclyingFourDotsLoading, ErrorMessage } from 'Common/components';
import { envVars } from 'Common/utils';
import { useEditProfile } from 'Profile/hooks';
import Image from 'next/image';
import { BiEditAlt } from 'react-icons/bi';

export function VisualIdentityView() {
  const { 
    profile,
    isProfileLoading, 
    isSubmitLoading,
    changedProfilePicture,
    changedCompanyPicture,
    changedProfile,
    hasChanges,
    onSubmit, 
    onCancel, 
    onChangeDetails,
    onChangeProfilePicture,
    onChangeCompanyPicture,
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
          <div className="flex flex-col justify-center text-center gap-10">
            <h1>Seu perfil será exibido desta forma</h1>

            <div className="rounded-xl shadow-lg p-8">
              <div className="flex w-full h-24 p-4 gap-6 items-center">
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
                  <input 
                    className="h-full w-full opacity-0 absolute left-0 top-0 cursor-pointer" 
                    type="file" 
                    accept=".jpg,.jpeg,.png" 
                    onChange={onChangeProfilePicture}
                  />
                </div>
                <div className="h-10 border-r"></div>
                <div className="flex flex-col text-start">
                  <div className="h-fit w-fit relative group">
                    {
                      changedCompanyPicture
                        ? (
                          <Image
                            height={30}
                            width={200}
                            className="max-h-[100px] object-cover"
                            src={URL.createObjectURL(changedCompanyPicture)}
                            alt="company-logo"
                          />
                          
                        )
                        : (
                          <Image
                            height={30}
                            width={200}
                            className="max-h-[100px] object-cover"
                            src={
                              profile.details.companyPictureUrl
                                ? `${envVars.saCompaniesUrl}/${profile.details.companyPictureUrl}`
                                : `${envVars.saAssetsUrl}/company_placeholder.png`
                            }
                            alt="company-logo"
                          />
                        )
                    }
                    <div className="flex justify-center items-center absolute left-0 w-full h-full bg-gray-500 top-0 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-70">
                      <BiEditAlt className="margin-auto size-10 text-black"/>
                    </div>
                    <input 
                      className="h-full w-full opacity-0 absolute left-0 top-0 cursor-pointer" 
                      type="file" 
                      accept=".jpg,.jpeg,.png" 
                      onChange={onChangeCompanyPicture}
                    />
                  </div>
                  <b>{changedProfile.details?.name !== undefined ? changedProfile.details?.name : profile.details.name}</b>
                </div> 
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