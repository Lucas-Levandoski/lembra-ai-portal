import { RecursivePartial, envVars, privateClient, publicClient } from 'Common';
import { IProfile, IShortProfile } from '../models';
import { toast } from 'react-toastify';


export const readProfileByTag = async (tag: string, errorFn: (data: any) => void = () => {}) => {
  return await publicClient.get<IShortProfile>(`${envVars.profileUrl}/user-tag`, {params: { tag }})
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages ?? 'Falha ao encontrar usuário pela tag');
      throw new Error(err);
    }) as IShortProfile | undefined;
};

export const readMyProfile = async (errorFn: (data: any) => void = () => {}) => {
  return await privateClient.get<IProfile>(`${envVars.profileUrl}/my-profile`)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages ?? 'Falha ao encontrar dados do usuário');
      throw new Error(err);
    }) as IProfile | undefined;
};

export const patchProfile = async (profile: RecursivePartial<IProfile>, errorFn: (data: any) => void = () => {}) => {
  return await privateClient.patch<IProfile>(`${envVars.profileUrl}/my-profile`, profile)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(err.response?.data?.messages ?? 'Falha ao atualizar dados do usuário');
      throw new Error(err);
    }) as IProfile | undefined;
};