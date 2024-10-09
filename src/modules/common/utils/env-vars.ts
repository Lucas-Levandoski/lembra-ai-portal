
export const envVars = {
  get agendaUrl() {
    return checkVariable('NEXT_PUBLIC_AGENDA_URL', 'https://fa-agenda-management-dev.azurewebsites.net/api');
  },

  get messageSenderUrl() {
    return checkVariable('NEXT_PUBLIC_MESSAGE_SENDER_URL', 'https://fa-message-sender-dev.azurewebsites.net/api');
  },

  get bookingsUrl() {
    return checkVariable('NEXT_PUBLIC_BOOKINGS_URL', 'https://fa-bookings-management-dev.azurewebsites.net/api');
  },

  get profileUrl() {
    return checkVariable('NEXT_PUBLIC_PROFILE_URL', 'https://fa-profile-management-dev.azurewebsites.net/api');
  },


  get tenantName() {
    return checkVariable('NEXT_PUBLIC_B2C_TENANT_NAME', 'lembraaidev');
  },

  get msalClientID() {
    return checkVariable('NEXT_PUBLIC_MSAL_CLIENT_ID', '8ab93fbe-25de-4662-b372-b2896c9688f1');
  },

  get msalRedirectURI() {
    return checkVariable('NEXT_PUBLIC_MSAL_REDIRECT_URI', '/portal');
  },

  get msalLogoutRedirectURI() {
    return checkVariable('NEXT_PUBLIC_MSAL_POST_LOGOUT_REDIRECT_URI', '/');
  },
};

function checkVariable(envVarName: string, defaultValue: unknown = undefined): string {
  const variable = process.env[envVarName];

  if(!variable && defaultValue === undefined)
    throw new Error(`${envVarName} missing from the environment variables list`);

  return variable ?? `${defaultValue}`;
}