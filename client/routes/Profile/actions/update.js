import check from 'check-types';

import { post } from 'utilities/api';
import { updateUserProfileConstants as constants } from '../constants';

function updateUserProfileFailure(error) {
  return {
    type: constants.UPDATE_USER_PROFILE_FAILURE,
    payload: error,
  };
}

export function updateUserProfile(attributes, token) {
  return async function action(dispatch) {
    dispatch({
      type: constants.UPDATE_USER_PROFILE_REQUEST,
    });

    if (!check.object(attributes)) {
      dispatch(updateUserProfileFailure({
        response: {
          status: 422,
          statusText: 'Invalid attributes',
        },
      }));
    }

    try {
      await post('/api/profile/edit', attributes, token);
      dispatch({
        type: constants.UPDATE_USER_PROFILE_SUCCESS,
      });
    } catch (e) {
      dispatch(updateUserProfileFailure(e));
    }

    setTimeout(() => {
      dispatch({
        type: constants.UPDATE_USER_PROFILE_INITIAL_STATE,
      });
    }, 5000);
  };
}
