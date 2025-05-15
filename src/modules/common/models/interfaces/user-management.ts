import { GOOGLE_SCOPES_MASKS } from '../constants';

export interface IGoogleConnected {
  isConnected: boolean, 
  connectedScopes: (keyof typeof GOOGLE_SCOPES_MASKS)[], 
  missingScopes: (keyof typeof GOOGLE_SCOPES_MASKS)[], 
  hasMissingScopes: boolean
}