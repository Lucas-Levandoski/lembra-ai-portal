import { envVars, privateClient } from 'Common';
import { Availability, IAvailabilityErroredItem } from '../models';
import { toast } from 'react-toastify';

export const getAvailabilities = async (errorFn: (data: IAvailabilityErroredItem) => void = () => {}) => {
  return await privateClient.get<Availability>(`${envVars.schedulerUrl}/my-availability`)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response.data);
      toast.error(err.response.data.message);
      return;
    }) as Availability;
}

export const setAvailabilities = async (availabilities: Availability, errorFn: (data: IAvailabilityErroredItem) => void = () => {}) => {
  return await privateClient.post<Availability>(`${envVars.schedulerUrl}/my-availability`, availabilities)
    .then(res => {
      toast.success('Disponibilidades salvas com sucesso');
      return res.data
    })
    .catch(err => {
      errorFn(err.response.data.data);
      toast.error(err.response.data.message);
      return;
    }) as Availability | undefined;
}