import { createReducer } from 'utilities/redux';
import { institutionConstants, transactionConstants, goalConstants } from 'constants/financial';

const initialState = {
  isRequesting: true,
  institutions: [],
  transactions: [],
  accounts: [],
  goals: [],
};

export default createReducer(initialState, {
  // INSTITUTIONS
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

  // TRANSACTIONS
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

  // GOALS
  [goalConstants.REQUEST_GOALS]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: true,
    });
  },
  [goalConstants.REQUEST_GOALS_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      goals: payload.goals,
    });
  },
  [goalConstants.REQUEST_GOALS_ERROR]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: false,
      goals: [],
    });
  },
  [goalConstants.CREATE_GOAL]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: true,
    });
  },
  [goalConstants.CREATE_GOAL_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {});
  },
  [goalConstants.CREATE_GOAL_ERROR]: (state, payload) => {
    return Object.assign({}, state, {
      isRequesting: false,
      transactions: [],
      accounts: [],
    });
  },

});
