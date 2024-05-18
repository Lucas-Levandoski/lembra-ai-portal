import { envVars, privateClient } from 'Common';
import { AvailabilitiesByDay } from '../models';
import { toast } from 'react-toastify';

export const getAvailabilities = async () => await privateClient.get<AvailabilitiesByDay>(`${envVars.schedulerUrl}/my-availability`)
  .then(res => res.data)
  .catch(() => toast('failure')) as AvailabilitiesByDay;


