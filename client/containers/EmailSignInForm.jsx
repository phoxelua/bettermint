import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import * as actionCreators from 'actions/auth/emailSignIn';

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

class EmailSignInForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
  };

  handleSubmit({ email, password }) {
    const redirectRoute = this.props.redirectRoute || '/';
    this.props.actions.signInUserWithCredentials(email, password, redirectRoute);
  }

  render() {
    const { fields: { email, password }, handleSubmit, submitting } = this.props;

    return (
      <form className="EmailSignUpForm" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
        <div className="EmailSignUpForm__input-group">
          <label>Email</label>
          <div className="EmailSignUpForm__input-wrapper">
            <input type="email" placeholder="john@doe.com" {...email} />
            {
              email.touched &&
              email.error &&
              <span className="EmailSignUpForm__input-wrapper__error">{email.error}</span>
            }
          </div>
        </div>
        <div className="EmailSignUpForm__input-group">
          <label>Password</label>
          <div className="EmailSignUpForm__input-wrapper">
            <input type="password" placeholder="hunter2" {...password} />
            {
              password.touched &&
              password.error &&
              <span className="EmailSignUpForm__input-wrapper__error">{password.error}</span>
            }
          </div>
        </div>
        <div className="EmailSignUpForm__input-group EmailSignUpForm__submit">
          <button type="submit" className="" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
        </div>
      </form>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticating: state.auth.isAuthenticating,
    statusText: state.auth.statusText
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(actionCreators, dispatch)
  };
};

export default reduxForm({
  form: 'emailSignInForm',
  fields,
  validate
},
mapStateToProps,
mapDispatchToProps
)(EmailSignInForm);
