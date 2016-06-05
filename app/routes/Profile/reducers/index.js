import { createReducer } from 'utilities/redux';
import {
  updateUserProfileConstants as updateConstants,
  fetchUserProfileConstants as fetchConstants,
} from '../constants';

const initialState = {
  isUpdating: false,
  didUpdate: false,
  userProfile: {},
};

export default createReducer(initialState, {
  [updateConstants.UPDATE_USER_PROFILE_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      isUpdating: true,
      didUpdate: false,
    });
  },
  [updateConstants.UPDATE_USER_PROFILE_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isUpdating: false,
      didUpdate: true,
    });
  },
  [updateConstants.UPDATE_USER_PROFILE_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      isUpdating: false,
      didUpdate: false,
    });
  },
  [updateConstants.UPDATE_USER_PROFILE_INITIAL_STATE]: (state, payload) => {
    return Object.assign({}, state, {
      isUpdating: false,
      didUpdate: false,
    });
  },

  [fetchConstants.FETCH_USER_PROFILE_REQUEST]: (state, payload) => {
    return Object.assign({}, state);
  },
  [fetchConstants.FETCH_USER_PROFILE_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      userProfile: payload,
    });
  },
  [fetchConstants.FETCH_USER_PROFILE_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      userProfile: {},
    });
  },
});
