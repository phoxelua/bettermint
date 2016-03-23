import { kittenConstants } from 'constants/kitten';
import { get, post, del } from 'utilities';

export function addKitten() {
  return async (dispatch) => {
    dispatch({
      type: kittenConstants.ADD_KITTEN
    });

    try {
      const result = await post('/api/kittens/');

      dispatch({
        type: kittenConstants.ADD_KITTEN_SUCCESS,
        payload: {
          kitten: result
        }
      });
    } catch(e) {
      dispatch({
        type: kittenConstants.ADD_KITTEN_ERROR
      });
    }
  }
}

export function requestKittens() {
  return async (dispatch) => {
    dispatch({
      type: kittenConstants.REQUEST_KITTENS
    });

    try {
      const result = await get('/api/kittens/');

      dispatch({
        type: kittenConstants.REQUEST_KITTENS_SUCCESS,
        payload: {
          kittens: result.kittens
        }
      });
    } catch(e) {
      dispatch({
        type: kittenConstants.REQUEST_KITTENS_ERROR
      });
    }
  }
}

export function deleteKitten(kittenId) {
  return async (dispatch) => {
    dispatch({
      type: kittenConstants.DELETE_KITTEN,
      kittenId
    });

    try {
      await del(`/api/kittens/${kittenId}/`);

      dispatch({
        type: kittenConstants.DELETE_KITTEN_SUCCESS,
        payload: {
          kittenId
        }
      });
    } catch(e) {
      dispatch({
        type: kittenConstants.DELETE_KITTEN_ERROR,
        payload: kittenId
      });
    }
  }
}
