import { envVars } from 'Common/utils';
import { privateClient } from 'Common/services';
import { IWhatsLoginResponse } from '../models';

export const whatsLogin = async (errorFn: (data: any) => void = () => {}): Promise<ReadableStream<IWhatsLoginResponse> | undefined> => {
  const bearer = privateClient.defaults.headers['Authorization']?.toString();
  if(!bearer) return;

  const res = await fetch(`${envVars.whatsIntegrationUrl}/login`, {
    headers: {
      'Authorization': bearer
    }
  }).then(
    response => response.body as ReadableStream<IWhatsLoginResponse>
  );

  if(!res) return;

  return res;
};
