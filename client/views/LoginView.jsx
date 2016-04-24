import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reactMixin from 'react-mixin';
import * as store from 'store';
import jwtDecode from 'jwt-decode';

import * as actionCreators from 'actions/auth/emailSignIn';
import EmailSignInForm from 'containers/EmailSignInForm';
import EmailSignUpForm from 'containers/EmailSignUpForm';

class LoginView extends Component {
  render () {
    const redirectRoute = this.props.location.query.redirect || '/login';

    let token = store.get('token');

    if (!!token) {
      this.props.actions.signInUserWithToken(token, redirectRoute);
    }

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


const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);
