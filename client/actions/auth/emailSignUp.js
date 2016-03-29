import { checkHttpStatus, parseResponse } from 'utilities';
import { authConstants } from 'constants/auth';
import { push } from 'react-router-redux'
import jwtDecode from 'jwt-decode';

function signUpUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: authConstants.SIGN_IN_USER_SUCCESS,
    payload: {
      token
    }
  };
};

function signUpUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: authConstants.SIGN_IN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
};

function signUpUserRequest() {
  return {
    type: authConstants.SIGN_IN_USER_REQUEST
  };
};

export function signUpUser(email, password, redirect='/') {
  return function(dispatch) {
    dispatch(signUpUserRequest());
    return fetch('http://localhost:3001/api/auth/signup/', {
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
        dispatch(signUpUserSuccess(response.data.token));
        dispatch(push(redirect));
      } catch (e) {
        dispatch(signUpUserFailure({
          response: {
            status: 403,
            statusText: 'Invalid token'
          }
        }));
      }
    })
    .catch(error => {
      dispatch(signUpUserFailure(error));
    });
  };
};
