import { checkHttpStatus, parseResponse } from 'utilities';
import { authenticationConstants as authConstants } from 'constants/authentication';
import { push } from 'react-router-redux'
import jwtDecode from 'jwt-decode';

function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: authConstants.SIGN_IN_USER_SUCCESS,
    payload: {
      token
    }
  };
};

function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: authConstants.SIGN_IN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
};

function loginUserRequest() {
  return {
    type: authConstants.SIGN_IN_USER_REQUEST
  };
};

function logout() {
  localStorage.removeItem('token');
  return {
    type: authConstants.SIGN_OUT_USER
  };
};

export function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout());
    dispatch(push('/login'));
  };
};

export function loginUser(email, password, redirect='/') {
  return function(dispatch) {
    dispatch(loginUserRequest());
    return fetch('http://localhost:3001/api/auth/token/', {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    .then(checkHttpStatus)
    .then(parseResponse)
    .then(response => {
      try {
        let decoded = jwtDecode(response.data.token);
        dispatch(loginUserSuccess(response.data.token));
        dispatch(push(redirect));
      } catch (e) {
        dispatch(loginUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token'
          }
        }));
      }
    })
    .catch(error => {
      dispatch(loginUserFailure(error));
    });
  };
};
