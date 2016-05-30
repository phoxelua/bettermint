import React, { Component, PropTypes } from 'react';
import * as store from 'store';

import EmailSignInFormContainer from '../containers/EmailSignInFormContainer';
import EmailSignUpFormContainer from '../containers/EmailSignUpFormContainer';

class LoginView extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }


  componentDidMount() {
    const redirectRoute = this.props.location.query.redirect || '/';
    const token = store.get('token');

    if (!!token) {
      this.props.actions.signInUserWithToken(token, redirectRoute);
    }
  }

  render() {
    const redirectRoute = this.props.location.query.redirect || '/';

    return (
      <div>
        <p>This is the sign in form</p>
        <EmailSignInFormContainer redirectRoute={redirectRoute} />
        <p>This is the sign up form</p>
        <EmailSignUpFormContainer redirectRoute={redirectRoute} />
      </div>
    );
  }
}

export default LoginView;
