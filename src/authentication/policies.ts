import { envVars } from 'Common';

const { tenantName } = envVars;

export const b2cPolicies = {
  names: {
    signUpSignIn: 'b2c_1a_accountlink_susi',
  },
  authorities: {
    signUpSignIn: {
      authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/B2C_1_SISU`,
    },
  },
  authorityDomain: `${tenantName}.b2clogin.com`,
};