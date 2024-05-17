
export const envVars = {
  get schedulerUrl() {
    return checkVariable('NEXT_PUBLIC_SCHEDULER_URL', 'http://localhost:3000/api');
  },

  get tenantName() {
    return checkVariable('NEXT_PUBLIC_B2C_TENANT_NAME', 'lembraaidev');
  },

  get msalClientID() {
    return checkVariable('NEXT_PUBLIC_MSAL_CLIENT_ID', '8ab93fbe-25de-4662-b372-b2896c9688f1');
  },
  
  get msalRedirectURI() {
    return checkVariable('NEXT_PUBLIC_MSAL_REDIRECT_URI', 'http://localhost:3000');
  },

  get msalLogoutRedirectURI() {
    return checkVariable('NEXT_PUBLIC_MSAL_POST_LOGOUT_REDIRECT_URI', 'http://localhost:3000');
  },
};

function checkVariable(envVarName: string, defaultValue: unknown = undefined): string {
  const variable = process.env[envVarName];

  if(!variable && defaultValue === undefined)
    throw new Error(`${envVarName} missing from the environment variables list`);

  return variable ?? `${defaultValue}`;
}