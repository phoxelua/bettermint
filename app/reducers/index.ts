import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

import auth from "./auth";
import financial from "./financial";
import profile from "../routes/Profile/reducers";

const reducers = combineReducers({
  auth,
  financial,
  profile,
  form: formReducer,
  routing: routerReducer,
});

export default reducers;
