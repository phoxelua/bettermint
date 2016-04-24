import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reactMixin from 'react-mixin';

import EmailSignInForm from 'containers/EmailSignInForm';
import EmailSignUpForm from 'containers/EmailSignUpForm';

class LoginView extends Component {
  render () {
    const redirectRoute = this.props.location.query.redirect || '/login';

    return (
      <div className='col-xs-12 col-md-6 col-md-offset-3'>
        <p>This is the sign in form</p>
        <EmailSignInForm redirectRoute={redirectRoute} />
        <p>This is the sign up form</p>
        <EmailSignUpForm redirectRoute={redirectRoute} />
      </div>
    );
  };
};

export default LoginView;
