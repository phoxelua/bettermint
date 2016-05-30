import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

import auth from 'reducers/auth';
import data from 'reducers/data';
import financial from 'reducers/financial';
import profile from 'routes/Profile/reducers';

const reducers = combineReducers({
  auth,
  data,
  financial,
  profile,
  form: formReducer,
  routing: routerReducer,
});

export default reducers;
