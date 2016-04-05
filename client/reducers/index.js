import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from 'reducers/auth';
import data from 'reducers/data';

const reducers = combineReducers({
  auth,
  data,
  form: formReducer,
  routing: routerReducer
});

export default reducers;
