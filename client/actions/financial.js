import * as path from 'path';

import { financialConstants } from 'constants/financial';
import { get, del } from 'utilities/api';

export function requestInstitutions(token) {
  return async (dispatch) => {
    dispatch({
      type: financialConstants.REQUEST_INSTITUTIONS,
    });

    try {
      const endpoint = '/api/financial/institution';
      const result = await get(endpoint, token);

      dispatch({
        type: financialConstants.REQUEST_INSTITUTIONS_SUCCESS,
        payload: {
          institutions: result.institutions,
        },
      });
    } catch (e) {
      dispatch({
        type: financialConstants.REQUEST_INSTITUTIONS_ERROR,
      });
    }
  };
}

export function deleteInstitution(institution, token) {
  return async (dispatch) => {
    dispatch({
      type: financialConstants.DELETE_INSTITUTION,
    });

    try {
      const endpoint = path.join('/api/financial/institution/', institution);
      await del(endpoint, token);

      dispatch({
        type: financialConstants.DELETE_INSTITUTION_SUCCESS,
        payload: {
          institution,
        },
      });
    } catch (e) {
      dispatch({
        type: financialConstants.DELETE_INSTITUTION_ERROR,
      });
    }
  };
}

export function requestTransactions(institution, token) {
  return async (dispatch) => {
    dispatch({
      type: financialConstants.REQUEST_TRANSACTIONS,
    });

    try {
      const endpoint = path.join('/api/financial/transactions', institution);
      const result = await get(endpoint, token);

      dispatch({
        type: financialConstants.REQUEST_TRANSACTIONS_SUCCESS,
        payload: {
          accounts: result.accounts,
          transactions: result.transactions,
        },
      });
    } catch (e) {
      dispatch({
        type: financialConstants.REQUEST_TRANSACTIONS_ERROR,
      });
    }
  };
}
