import { checkHttpStatus, parseResponse } from 'utilities/http';
import { authConstants as authConstants } from 'constants/auth';
import { push } from 'react-router-redux';
import jwtDecode from 'jwt-decode';

function signInUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: authConstants.SIGN_IN_USER_SUCCESS,
    payload: {
      token,
    },
  };
}

function signInUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: authConstants.SIGN_IN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

function signInUserRequest() {
  return {
    type: authConstants.SIGN_IN_USER_REQUEST,
  };
}

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

function signUpUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: authConstants.SIGN_IN_USER_SUCCESS,
    payload: {
      token,
    },
  };
}

function signUpUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: authConstants.SIGN_IN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText,
    },
  };
}

function signUpUserRequest() {
  return {
    type: authConstants.SIGN_IN_USER_REQUEST,
  };
}

export function signUpUser(firstName, lastName, email, password, redirect = '/') {
  return function action(dispatch) {
    dispatch(signUpUserRequest());
    return fetch('http://localhost:3001/api/auth/signup/', {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    })
    .then(checkHttpStatus)
    .then(parseResponse)
    .then(response => {
      try {
        jwtDecode(response.token);
        dispatch(signUpUserSuccess(response.token));
        dispatch(push(redirect));
      } catch (e) {
        dispatch(signUpUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token',
          },
        }));
      }
    })
    .catch(error => {
      dispatch(signUpUserFailure(error));
    });
  };
}