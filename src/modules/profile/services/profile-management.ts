import { RecursivePartial, envVars } from 'Common/utils';
import { privateClient, publicClient } from 'Common/services';
import { IProfile, IShortProfile } from '../models';
import { toast } from 'react-toastify';

export const readProfileByTag = async (tag: string, errorFn: (data: any) => void = () => {}) => {
  return await publicClient.get<IShortProfile>(`${envVars.profileUrl}/user-tag`, {params: { tag }})
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages.join('\n')  ?? 'Falha ao encontrar usuário pela tag');
      throw err;
    }) as IShortProfile | undefined;
};

export const readProfileById = async (userId: string, errorFn: (data: any) => void = () => {}) => {
  return await publicClient.get<IShortProfile>(`${envVars.profileUrl}/user-id`, {params: { userId }})
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages.join('\n')  ?? 'Falha ao encontrar usuário pelo id');
      throw err;
    }) as IShortProfile | undefined;
};

export const readMyProfile = async (errorFn: (data: any) => void = () => {}) => {
  return await privateClient.get<IProfile>(`${envVars.profileUrl}/my-profile`)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages.join('\n')  ?? 'Falha ao encontrar dados do usuário');
      throw err;
    }) as IProfile | undefined;
};

export const patchProfile = async (profile: RecursivePartial<IProfile>, errorFn: (data: any) => void = () => {}) => {
  return await privateClient.patch<IProfile>(`${envVars.profileUrl}/my-profile`, profile)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages.join('\n') ?? 'Falha ao atualizar dados do usuário');
      throw err;
    }) as IProfile | undefined;
};

export const uploadProfile = async (file: File, errorFn: (data: any) => void = () => {}) => {
  const formDate = new FormData();
  formDate.append('picture', file);

  return await privateClient.post<undefined>(`${envVars.profileUrl}/upload/profile`, formDate)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages.join('\n')  ?? 'Falha ao atualizar foto de perfil');
      throw err;
    }) as undefined;
};

export const uploadCompany = async (file: File, errorFn: (data: any) => void = () => {}) => {
  const formDate = new FormData();
  formDate.append('picture', file);

  return await privateClient.post<undefined>(`${envVars.profileUrl}/upload/company`, formDate)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages.join('\n')  ?? 'Falha ao atualizar foto de capa');
      throw err;
    }) as undefined;
};

export const disconnectMyWhatsapp = async (userId: string, errorFn: (data: any) => void = () => {}) => {
  return await privateClient.delete<IProfile>(`${envVars.profileUrl}/my-connections/whatsapp`, {params: { userId }})
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages.join('\n')  ?? 'Falha ao remover conexão de whatsapp do usuário');
      throw err;
    });
};