import * as path from 'path';

import { financialConstants } from 'constants/financial';
import { get } from 'utilities';

export function requestTransactions(institution) {
  return async (dispatch) => {
    dispatch({
      type: financialConstants.REQUEST_TRANSACTIONS,
    });

    try {
      const endpoint = path.join('/api/financial/institution', institution);
      const result = await get(endpoint);

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
