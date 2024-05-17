import { envVars, privateClient } from 'Common';
import { AvailabilitiesByDay } from '../models';

export const getSchedules = async () => await privateClient.get<AvailabilitiesByDay>(envVars.schedulerUrl).then(res => res.data);