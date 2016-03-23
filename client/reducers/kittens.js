import { kittenConstants } from 'constants/kitten';
import { createReducer } from 'utilities';


const initialState = {
  activeKittens: []
};

export default createReducer(initialState, {
  [kittenConstants.ADD_KITTEN_SUCCESS]: (state, payload) => {
    let activeKittens = state.activeKittens.slice();
    activeKittens.push(payload.kitten);
    return Object.assign({}, state, {
      activeKittens
    });
  },
  [kittenConstants.REQUEST_KITTENS_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      activeKittens: payload.kittens
    });
  },
  [kittenConstants.DELETE_KITTEN_SUCCESS]: (state, payload) => {
    let activeKittens = state.activeKittens.slice();
    activeKittens = activeKittens.filter(kitten => kitten.id !== payload.kittenId);
    return Object.assign({}, state, {
      activeKittens
    });
  }
});
