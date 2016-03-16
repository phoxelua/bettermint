import { checkHttpStatus, parseJSON } from 'redux/utils';
import { userConstants } from 'redux/constants/user';
import { push } from 'react-router-redux'
import jwtDecode from 'jwt-decode';


function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: userConstants.LOGIN_USER_SUCCESS,
    payload: {
      token
    }
  }
}

function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: userConstants.LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

function loginUserRequest() {
  return {
    type: userConstants.LOGIN_USER_REQUEST
  }
}

function logout() {
  localStorage.removeItem('token');
  return {
    type: userConstants.LOGOUT_USER
  }
}

export function logoutAndRedirect() {
  return (dispatch, state) => {
    dispatch(logout());
    dispatch(push('/login'));
  }
}

export function loginUser(email, password, redirect='/') {
  return function(dispatch) {
    dispatch(loginUserRequest());
    return fetch('http://localhost:3001/api/login/token/', {
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
    .then(parseJSON)
    .then(response => {
      try {
        let decoded = jwtDecode(response.token);
        dispatch(loginUserSuccess(response.token));
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
    })
  }
}
