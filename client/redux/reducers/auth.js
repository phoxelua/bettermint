import { createReducer } from 'redux/utils';
import { userConstants } from 'redux/constants/user';
import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';

const initialState = {
  token: null,
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null
};


export default createReducer(initialState, {
  [userConstants.LOGIN_USER_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: true,
      statusText: null
    });
  },
  [userConstants.LOGIN_USER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: true,
      token: payload.token,
      userName: jwtDecode(payload.token).userName,
      statusText: 'You have been successfully logged in.'
    });
  },
  [userConstants.LOGIN_USER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticating: false,
      isAuthenticated: false,
      token: null,
      userName: null,
      statusText: `Authentication Error: ${payload.status} ${payload.statusText}`
    });
  },
  [userConstants.LOGOUT_USER]: (state, payload) => {
    return Object.assign({}, state, {
      isAuthenticated: false,
      token: null,
      userName: null,
      statusText: 'You have been successfully logged out.'
    });
  }
});
