import { kittenConstants } from 'redux/constants/kittens';
import { createReducer } from 'redux/utils';


const initialState = {
  kittens: []
};

export default createReducer(initialState, {
  [kittenConstants.ADD_KITTEN_SUCCESS]: (state, payload) => {
    var newState = state.slice();
    newState.push(payload.kitten);
    return newState;
  },
  [kittenConstants.REQUEST_KITTENS_SUCCESS]: (state, payload) => {
    return payload.kittens || [];
  },
  [kittenConstants.DELETE_KITTEN_SUCCESS]: (state, payload) => {
    return state.filter(kitten => kitten.id !== payload.kittenId);
  }
});
