import { envVars, privateClient } from 'Common';

export const calculateMyAvailableTimes = async (errorFn: (data: any) => void = () => {}): Promise<string> => {
  return await privateClient.post<string>(`${envVars.bookingsUrl}/calculate-my-available-times`)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      throw err;
    });
};
