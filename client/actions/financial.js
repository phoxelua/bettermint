import { financialConstants } from 'constants/financial';
import { get, post, del } from 'utilities';

export function requestTransactions(institution) {
  return async (dispatch) => {
    dispatch({
      type: financialConstants.REQUEST_TRANSACTIONS
    });

    try {
      const result = await get('/api/financial/institution/' + institution);  // TODO: Find some utility which joins paths

      console.log(result);

      dispatch({
        type: financialConstants.REQUEST_TRANSACTIONS_SUCCESS,
        payload: {
          kittens: result.kittens
        }
      });
    } catch(e) {
      dispatch({
        type: financialConstants.REQUEST_TRANSACTIONS_ERROR
      });
    }
  }
};
