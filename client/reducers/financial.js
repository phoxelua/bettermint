import { createReducer } from 'utilities';
import { financialConstants } from 'constants/financial';
import { push } from 'react-router-redux';

const initialState = {
  isRequesting: true,
  transactions: []
};


export default createReducer(initialState, {
  [financialConstants.REQUEST_TRANSACTIONS]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: true,
      transactions: [],
    });
  },
  [financialConstants.REQUEST_TRANSACTIONS_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: false,
      transactions: payload.transactions,
    });
  },
  [financialConstants.REQUEST_TRANSACTIONS_ERROR]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: false,
      transactions: [],
    });
  }
});
