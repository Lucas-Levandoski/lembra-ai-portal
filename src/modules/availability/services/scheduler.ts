import { envVars, privateClient } from 'Common';
import { AvailabilitiesByDay } from '../models';
import { toast } from 'react-toastify';

export const getAvailabilities = async () => {
  return await privateClient.get<AvailabilitiesByDay>(`${envVars.schedulerUrl}/my-availability`)
    .then(res => res.data)
    .catch(err => {
      toast.error(err.response.data);
      return;
    }) as AvailabilitiesByDay;
}

export const setAvailabilities = async (availabilities: AvailabilitiesByDay) => {
  return await privateClient.post<AvailabilitiesByDay>(`${envVars.schedulerUrl}/my-availability`, availabilities)
    .then(res => {
      toast.success('Disponibilidades salvas com sucesso');
      return res.data
    })
    .catch(err => {
      toast.error(err.response.data);
      return;
    }) as AvailabilitiesByDay | undefined;
}