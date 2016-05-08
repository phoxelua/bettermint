import { createConstants } from 'utilities/redux';

export const institutionConstants = createConstants(
  'REQUEST_INSTITUTIONS',
  'REQUEST_INSTITUTIONS_SUCCESS',
  'REQUEST_INSTITUTIONS_ERROR',
  'DELETE_INSTITUTION',
  'DELETE_INSTITUTION_SUCCESS',
  'DELETE_INSTITUTION_ERROR',
);

export const transactionConstants = createConstants(
  'REQUEST_TRANSACTIONS',
  'REQUEST_TRANSACTIONS_SUCCESS',
  'REQUEST_TRANSACTIONS_ERROR',
);

export const goalConstants = createConstants(
  'REQUEST_GOALS',
  'REQUEST_GOALS_SUCCESS',
  'REQUEST_GOALS_ERROR',
  'CREATE_GOAL',
  'CREATE_GOAL_SUCCESS',
  'CREATE_GOAL_ERROR',
);
