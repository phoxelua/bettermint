import { createReducer } from 'utilities/redux';
import { institutionConstants, transactionConstants } from 'constants/financial';

const initialState = {
  isRequesting: true,
  institutions: [],
  transactions: [],
  accounts: [],
};


export default createReducer(initialState, {
  [institutionConstants.REQUEST_INSTITUTIONS]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: true,
      institutions: [],
    });
  },
  [institutionConstants.REQUEST_INSTITUTIONS_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: false,
      institutions: payload.institutions,
    });
  },
  [institutionConstants.REQUEST_INSTITUTIONS_ERROR]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: false,
      institutions: [],
    });
  },
  [institutionConstants.DELETE_INSTITUTION]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: true,
    });
  },
  [institutionConstants.DELETE_INSTITUTION_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: false,
      institutions: state.institutions.filter((institution) => institution !== payload.institution),
    });
  },
  [institutionConstants.DELETE_INSTITUTION_ERROR]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: false,
    });
  },
  [transactionConstants.REQUEST_TRANSACTIONS]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: true,
    });
  },
  [transactionConstants.REQUEST_TRANSACTIONS_SUCCESS]: (state, payload) => {
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
  [transactionConstants.REQUEST_TRANSACTIONS_ERROR]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: false,
      transactions: [],
      accounts: [],
    });
  },
});
