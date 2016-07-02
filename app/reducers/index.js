import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import data from './data';
import financial from './financial';
import profile from '../routes/Profile/reducers';

const reducers = combineReducers({
  auth,
  data,
  financial,
  profile,
  form: formReducer,
  routing: routerReducer,
});

export default reducers;
