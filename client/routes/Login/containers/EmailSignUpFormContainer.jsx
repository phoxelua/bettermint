import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import zxcvbn from 'zxcvbn';

import * as actionCreators from '../actions';
import EmailSignUpForm from '../components/EmailSignUpForm';

const fields = ['firstName', 'lastName', 'email', 'password'];

const validEmailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!validEmailRegex.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else {
    const passwordStrength = zxcvbn(values.password).score;
    if (passwordStrength < 2) {
      errors.password = 'Password is too weak';
    }
  }

  return errors;
};

// TODO: update this
const mapStateToProps = (state) => {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

export default reduxForm({
  form: 'emailSignUpForm',
  fields,
  validate,
},
mapStateToProps,
mapDispatchToProps
)(EmailSignUpForm);
