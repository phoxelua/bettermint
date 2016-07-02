import * as path from 'path';

import { institutionConstants } from '../../constants/financial';
import { get, del } from '../../utilities/api';

export function requestInstitutions(token) {
  return async (dispatch) => {
    dispatch({
      type: institutionConstants.REQUEST_INSTITUTIONS,
    });

    try {
      const endpoint = '/api/financial/institution';
      const result = await get(endpoint);

      dispatch({
        type: institutionConstants.REQUEST_INSTITUTIONS_SUCCESS,
        payload: {
          institutions: result.institutions,
        },
      });
    } catch (e) {
      dispatch({
        type: institutionConstants.REQUEST_INSTITUTIONS_ERROR,
      });
    }
  };
}

export function deleteInstitution(institution, token) {
  return async (dispatch) => {
    dispatch({
      type: institutionConstants.DELETE_INSTITUTION,
    });

    try {
      const endpoint = path.join('/api/financial/institution/', institution);
      await del(endpoint);

      dispatch({
        type: institutionConstants.DELETE_INSTITUTION_SUCCESS,
        payload: {
          institution,
        },
      });
    } catch (e) {
      dispatch({
        type: institutionConstants.DELETE_INSTITUTION_ERROR,
      });
    }
  };
}
