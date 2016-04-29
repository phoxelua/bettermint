import { createReducer } from 'utilities/redux';
import { financialConstants } from 'constants/financial';

const initialState = {
  isRequesting: true,
  institutions: [],
  transactions: [],
  accounts: [],
};


export default createReducer(initialState, {
  [financialConstants.REQUEST_INSTITUTIONS]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: true,
      institutions: [],
    });
  },
  [financialConstants.REQUEST_INSTITUTIONS_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: false,
      institutions: payload.institutions,
    });
  },
  [financialConstants.REQUEST_INSTITUTIONS_ERROR]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: false,
      institutions: [],
    });
  },
  [financialConstants.REQUEST_TRANSACTIONS]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: true,
    });
  },
  [financialConstants.REQUEST_TRANSACTIONS_SUCCESS]: (state, payload) => {
    const oldTransactions = state
      .transactions
      .slice()
      .concat(payload.transactions);
    const oldAccounts = state
      .accounts
      .slice()
      .concat(payload.accounts);

    return Object.assign({}, state, {
      isRequesting: false,
      transactions: oldTransactions,
      accounts: oldAccounts,
    });
  },
  [financialConstants.REQUEST_TRANSACTIONS_ERROR]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: false,
      transactions: [],
      accounts: [],
    });
  },
});
