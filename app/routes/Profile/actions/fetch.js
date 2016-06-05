import { get } from 'utilities/api';
import { fetchUserProfileConstants as constants } from '../constants';

function fetchUserProfileFailure(error) {
  return {
    type: constants.FETCH_USER_PROFILE_FAILURE,
    payload: error,
  };
}

export function fetchUserProfile(token) {
  return async function action(dispatch) {
    dispatch({
      type: constants.FETCH_USER_PROFILE_REQUEST,
    });

    try {
      const result = await get('/api/profile/', token);

      dispatch({
        type: constants.FETCH_USER_PROFILE_SUCCESS,
        payload: result.userProfile,
      });
    } catch (e) {
      dispatch(fetchUserProfileFailure(e));
    }
  };
}
