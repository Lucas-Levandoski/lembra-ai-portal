import { publicClient } from 'Common';
import { ICepResponse } from 'Profile/models';
import { toast } from 'react-toastify';


export async function getDataFromCEP(cep: string, errorFn: (data: any) => void = () => {}): Promise<ICepResponse | undefined> {

  return await publicClient.get<ICepResponse>(`https://viacep.com.br/ws/${cep}/json`)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      toast.error(JSON.stringify(err.response?.data) ?? 'Falha ao conectar com api de CEP');
      throw err;
    });

}