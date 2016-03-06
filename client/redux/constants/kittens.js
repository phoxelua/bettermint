import { createConstants } from 'redux/utils';

export const kittenConstants = createConstants(
  'REQUEST_KITTENS',
  'REQUEST_KITTENS_SUCCESS',
  'REQUEST_KITTENS_ERROR',
  'ADD_KITTEN',
  'ADD_KITTEN_SUCCESS',
  'ADD_KITTEN_ERROR',
  'DELETE_KITTEN',
  'DELETE_KITTEN_SUCCESS',
  'DELETE_KITTEN_ERROR'
);
