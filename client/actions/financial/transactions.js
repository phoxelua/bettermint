import * as path from 'path';

import { transactionConstants } from 'constants/financial';
import { get } from 'utilities/api';

export function requestTransactions(institution, token) {
  return async (dispatch) => {
    dispatch({
      type: transactionConstants.REQUEST_TRANSACTIONS,
    });

    try {
      const endpoint = path.join('/api/financial/transactions', institution);
      const result = await get(endpoint, token);

      dispatch({
        type: transactionConstants.REQUEST_TRANSACTIONS_SUCCESS,
        payload: {
          accounts: result.accounts,
          transactions: result.transactions,
        },
      });
    } catch (e) {
      dispatch({
        type: transactionConstants.REQUEST_TRANSACTIONS_ERROR,
      });
    }
  };
}
