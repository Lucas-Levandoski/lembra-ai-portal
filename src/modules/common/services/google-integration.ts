import { envVars, IGoogleConnected, privateClient } from 'Common';


export const isGoogleAccountConnected = async (errorFn: (data: any) => void = () => {}) => {
  return await privateClient.get<IGoogleConnected>(`${envVars.googleIntegrationUrl}/auth/is-user-connected`)
    .then(res => res.data)
    .catch(err => {
      errorFn(err.response?.data);
      throw err;
    }) as IGoogleConnected | undefined;
};