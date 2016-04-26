import Promise from 'bluebird';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { push } from 'react-router-redux';

export { get, post, del } from 'utilities/api';

export function createConstants(...constants) {
  return constants.reduce((accumulator, constant) => {
    const newAccumulator = accumulator;
    newAccumulator[constant] = constant;
    return newAccumulator;
  }, {});
}

export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    const reducer = reducerMap[action.type];

    return reducer
      ? reducer(state, action.payload)
      : state;
  };
}

export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function parseResponse(response) {
  const json = response.json();
  if (response.status >= 200 && response.status < 300) {
    return json;
  } else {
    return json.then(err => Promise.reject(err));
  }
}

export const requireAuthentication = UserAuthWrapper({ // eslint-disable-line new-cap
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated,
  redirectAction: push,
  wrapperDisplayName: 'UserIsJWTAuthenticated',
});
