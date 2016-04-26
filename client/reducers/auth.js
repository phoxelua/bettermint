import { createReducer } from 'utilities';
import { authConstants } from 'constants/auth';
import jwtDecode from 'jwt-decode';

const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
};

export default createReducer(initialState, {
  [authConstants.SIGN_IN_USER_REQUEST]: (state) => {
    return Object.assign({}, state, {
      isAuthenticating: true,
      statusText: null,
    });
  },
  [authConstants.SIGN_IN_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      token: payload.token,
      userName: jwtDecode(payload.token).userName,
      statusText: 'You have been successfully logged in.',
    });
  },
  [authConstants.SIGN_IN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      userName: null,
      statusText: `Authentication Error: ${payload.status} ${payload.statusText}`,
    });
  },
  [authConstants.SIGN_OUT_USER]: (state) => {
    return Object.assign({}, state, {
      isAuthenticated: false,
      token: null,
      userName: null,
      statusText: 'You have been successfully logged out.',
    });
  },
});
