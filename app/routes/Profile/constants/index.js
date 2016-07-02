import { createConstants } from '../../../utilities/redux';

export const updateUserProfileConstants = createConstants(
  'UPDATE_USER_PROFILE_REQUEST',
  'UPDATE_USER_PROFILE_SUCCESS',
  'UPDATE_USER_PROFILE_FAILURE',
  'UPDATE_USER_PROFILE_INITIAL_STATE',
);

export const fetchUserProfileConstants = createConstants(
  'FETCH_USER_PROFILE_REQUEST',
  'FETCH_USER_PROFILE_SUCCESS',
  'FETCH_USER_PROFILE_FAILURE',
);
