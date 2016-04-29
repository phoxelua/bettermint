import { createConstants } from 'utilities/redux';

export const financialConstants = createConstants(
  'REQUEST_INSTITUTIONS',
  'REQUEST_INSTITUTIONS_SUCCESS',
  'REQUEST_INSTITUTIONS_ERROR',
  'REQUEST_TRANSACTIONS',
  'REQUEST_TRANSACTIONS_SUCCESS',
  'REQUEST_TRANSACTIONS_ERROR'
);
