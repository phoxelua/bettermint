import { createReducer } from 'utilities';
import {
  RECEIVE_PROTECTED_DATA,
  FETCH_PROTECTED_DATA_REQUEST,
} from 'constants/auth';

const initialState = {
  data: null,
  isFetching: false,
};

export default createReducer(initialState, {
  [RECEIVE_PROTECTED_DATA]: (state, payload) => {
    return Object.assign({}, state, {
      data: payload.data,
      isFetching: false,
    });
  },
  [FETCH_PROTECTED_DATA_REQUEST]: (state) => {
    return Object.assign({}, state, {
      isFetching: true,
    });
  },
});
