import { createConstants } from 'utilities';

export const authenticationConstants = createConstants(
  'SIGN_IN_USER_REQUEST',
  'SIGN_IN_USER_FAILURE',
  'SIGN_IN_USER_SUCCESS',
  'SIGN_OUT_USER',
  'FETCH_PROTECTED_DATA_REQUEST',
  'RECEIVE_PROTECTED_DATA'
);
