import { push } from 'react-router-redux';

import { authConstants as authConstants } from '../constants/auth';

function signOut() {
  localStorage.removeItem('token');
  return {
    type: authConstants.SIGN_OUT_USER,
  };
}

export function signOutAndRedirect() {
  return (dispatch) => {
    dispatch(signOut());
    dispatch(push('/login'));
  };
}
