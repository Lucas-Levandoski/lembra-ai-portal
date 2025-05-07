
export const envVars = {
  get agendaUrl() {
    return checkVariable('NEXT_PUBLIC_AGENDA_URL', 'https://fa-agenda-management-dev.azurewebsites.net/api');
  },

  get userManagementUrl() {
    return checkVariable('NEXT_PUBLIC_USER_MANAGEMENT_URL', 'https://fa-user-management-dev.azurewebsites.net/api');
  },

  get googleIntegrationUrl() {
    return checkVariable('NEXT_PUBLIC_GOOGLE_INTEGRATION_URL', 'https://fa-google-integration-dev.azurewebsites.net/api');
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

  get whatsIntegrationUrl() {
    return checkVariable('NEXT_PUBLIC_WHATS_INTEGRATION_URL', 'https://fa-whats-integration-dev.azurewebsites.net/api');
  },

  get tenantName() {
    return checkVariable('NEXT_PUBLIC_B2C_TENANT_NAME', 'lembradev');
  },

  get msalClientID() {
    return checkVariable('NEXT_PUBLIC_MSAL_CLIENT_ID', '0c9c9fdc-4cb4-44d1-88ce-3325d93b4f19');
  },

  get msalRedirectURI() {
    return checkVariable('NEXT_PUBLIC_MSAL_REDIRECT_URI', '/portal');
  },

  get msalLogoutRedirectURI() {
    return checkVariable('NEXT_PUBLIC_MSAL_POST_LOGOUT_REDIRECT_URI', '/');
  },

  get saAssetsUrl() {
    return checkVariable('NEXT_PUBLIC_SA_ASSETS_URL', 'https://salembraassetsdev.blob.core.windows.net/assets');
  },

  get saProfilesUrl() {
    return checkVariable('NEXT_PUBLIC_SA_PROFILES_URL', 'https://salembraassetsdev.blob.core.windows.net/profile-images');
  },

  get saCompaniesUrl() {
    return checkVariable('NEXT_PUBLIC_SA_COMPANIES_URL', 'https://salembraassetsdev.blob.core.windows.net/company-images');
  },

  get googleConsentUrl() {
    return checkVariable('NEXT_PUBLIC_GOOGLE_CONSENT_URL', 'https://fa-user-management-dev.azurewebsites.net/api/google/auth/consent');
  },
};

function checkVariable(envVarName: string, defaultValue: unknown = undefined): string {
  const variable = process.env[envVarName];

  if(!variable && defaultValue === undefined)
    throw new Error(`${envVarName} missing from the environment variables list`);

  return variable ?? `${defaultValue}`;
}