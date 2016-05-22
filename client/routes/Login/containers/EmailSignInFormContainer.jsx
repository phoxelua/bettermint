import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import * as actionCreators from '../actions';
import EmailSignInForm from '../components/EmailSignInForm';

const fields = ['email', 'password'];

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  }

  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

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
  form: 'emailSignInForm',
  fields,
  validate,
},
mapStateToProps,
mapDispatchToProps
)(EmailSignInForm);
