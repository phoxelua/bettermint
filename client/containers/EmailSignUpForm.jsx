import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import zxcvbn from 'zxcvbn';

import * as actionCreators from 'actions/auth/emailSignUp';

const fields = ['firstName', 'lastName', 'email', 'password'];

// TODO: do something with these errors.
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
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    // TODO: Put this regex in some sort of utility

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
    const { fields: { firstName, lastName, email, password }, handleSubmit } = this.props;

    return (
      <div className="row">
        <form className="col s12"
          onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <div className="row">
            <div className="input-field col s6">
              <input type="text" className="validate" id="first-name" placeholder="John"
                {...firstName}/>
              <label htmlFor="first-name">First Name</label>
            </div>
            <div className="input-field col s6">
              <input type="text" className="validate" id="last-name" placeholder="Doe"
                {...lastName} />
              <label htmlFor="last-name">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input type="email" className="validate" id="email" placeholder="john@doe.com"
                {...email} />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input type="password" className="validate" id="password" placeholder="hunter2"
                {...password} />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button type="submit" className="btn btn-lg">
            Submit
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
