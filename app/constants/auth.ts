import { createConstants } from "../utilities/redux";

export const authConstants = createConstants(
  "SIGN_IN_USER_REQUEST",
  "SIGN_IN_USER_FAILURE",
  "SIGN_IN_USER_SUCCESS",
  "SIGN_OUT_USER"
);
