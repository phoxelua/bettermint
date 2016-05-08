import { checkHttpStatus, parseResponse } from 'utilities/http';
import { authConstants as authConstants } from 'constants/auth';
import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';

export function signInUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: authConstants.SIGN_IN_USER_SUCCESS,
    payload: {
      token,
    },
  };
}

export function signInUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: authConstants.SIGN_IN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

export function signInUserRequest() {
  return {
    type: authConstants.SIGN_IN_USER_REQUEST,
  };
}

export function signOut() {
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

export function signInUserWithCredentials(email, password, redirect='/') {
  return function action(dispatch) {
    dispatch(signInUserRequest());
    return fetch('/api/auth/token/', {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then(checkHttpStatus)
    .then(parseResponse)
    .then(response => {
      try {
        jwtDecode(response.token);
        dispatch(signInUserSuccess(response.token));
        dispatch(push(redirect));
      } catch (e) {
        dispatch(signInUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid password.',
          },
        }));
      }
    })
    .catch(error => {
      dispatch(signInUserFailure(error));
    });
  };
}

export function signInUserWithToken(token, redirect='/') {
  return function action(dispatch) {
    // TODO: Check if the token is valid, first.
    try {
      jwtDecode(token);
      dispatch(signInUserSuccess(token));
      dispatch(push(redirect));
    } catch (e) {
      // TODO: Consider doing something special here where we say your session expired.
      dispatch(signInUserFailure({
        response: {
          status: 403,
          statusText: 'Invalid token.',
        },
      }));
    }
  };
}
