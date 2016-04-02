import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import zxcvbn from 'zxcvbn';

import * as actionCreators from 'actions/auth/emailSignUp';

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
    let passwordStrength = zxcvbn(values.password).score;
    if (passwordStrength < 2) {
      errors.password = 'Password is too weak';
    }
  }

  return errors;
};

class EmailSignUpForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired
  };

  handleSubmit ({ firstName, lastName, email, password }) {
    var redirectRoute = this.props.redirectRoute || '/';
    this.props.actions.signUpUser(firstName, lastName, email, password, redirectRoute);
  }

  render () {
    const { fields: { firstName, lastName, email, password }, handleSubmit, submitting } = this.props;

    return (
      <div className="">
        <form className="" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <div className="">
            <input type="text" placeholder="John" {...firstName}/>
            {firstName.touched && firstName.error && <div>{firstName.error}</div>}
          </div>
          <div className="">
            <input type="text" placeholder="Doe" {...lastName} />
            {lastName.touched && lastName.error && <div>{lastName.error}</div>}
          </div>
          <div className="">
            <input type="email" placeholder="john@doe.com" {...email} />
            {email.touched && email.error && <div>{email.error}</div>}
          </div>
          <div className="">
            <input type="password" placeholder="hunter2" {...password} />
            {password.touched && password.error && <div>{password.error}</div>}
          </div>
          <button type="submit" className="" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
        </form>
      </div>
    )
  }
};

// TODO: update this
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
  form: 'emailSignUpForm',
  fields,
  validate
},
mapStateToProps,
mapDispatchToProps
)(EmailSignUpForm);
