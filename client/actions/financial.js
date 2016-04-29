import * as path from 'path';

import { financialConstants } from 'constants/financial';
import { get } from 'utilities/api';

export function requestInstitutions(token) {
  return async (dispatch) => {
    dispatch({
      type: financialConstants.REQUEST_INSTITUTIONS,
    });

    try {
      const endpoint = path.join('/api/financial/institution');
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
