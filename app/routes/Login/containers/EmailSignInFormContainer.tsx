import { bindActionCreators } from "redux";
import { reduxForm } from "redux-form";

import * as actionCreators from "../actions";
import EmailSignInForm from "../components/EmailSignInForm";

const fields = ["email", "password"];

interface IEmailSignInFormErrors {
  email?: string;
  password?: string;
}

const validate = values => {
  const errors: IEmailSignInFormErrors = {};

  if (!values.email) {
    errors.email = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

export default reduxForm({
  form: "EmailSignInForm",
  fields,
  validate,
},
mapStateToProps,
mapDispatchToProps
)(EmailSignInForm);
