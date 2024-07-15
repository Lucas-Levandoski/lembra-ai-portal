import { envVars, publicClient } from 'Common';
import { IShortProfile } from '../models';
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