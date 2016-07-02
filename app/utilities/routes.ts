import { UserAuthWrapper } from "redux-auth-wrapper";
import { push } from "react-router-redux";

export const requireAuthentication = UserAuthWrapper({ // eslint-disable-line new-cap
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated,
  redirectAction: push,
  wrapperDisplayName: "UserIsJWTAuthenticated",
});
