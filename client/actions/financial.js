import * as path from 'path';

import { financialConstants } from 'constants/financial';
import { get, post, del } from 'utilities';

export function requestTransactions(institution) {
  return async (dispatch) => {
    dispatch({
      type: financialConstants.REQUEST_TRANSACTIONS
    });

    try {
      let endpoint = path.join('/api/financial/institution', institution);

      const result = await get(endpoint);

      dispatch({
        type: financialConstants.REQUEST_TRANSACTIONS_SUCCESS,
        payload: {
          transactions: result.transactions
        }
      });
    } catch(e) {
      dispatch({
        type: financialConstants.REQUEST_TRANSACTIONS_ERROR
      });
    }
  }
};
