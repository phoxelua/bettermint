import { transactionConstants } from "../../constants/financial";
import { get } from "../../utilities/api";

export function requestTransactions(institution) {
  return async (dispatch) => {
    dispatch({
      type: transactionConstants.REQUEST_TRANSACTIONS,
    });

    try {
      const endpoint = "/api/financial/transactions" + institution;
      const result = await get(endpoint);

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
