import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reactMixin from 'react-mixin';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import * as actionCreators from 'actions/auth/emailSignIn';

class EmailSignInForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectTo: props.redirectRoute
    };
  }

  signIn (e) {
    e.preventDefault();
    this.props.actions.loginUser(this.state.email, this.state.password, this.state.redirectTo);
  }

  render () {
    return (
      <div className="row">
        <form className="col s12">
          {this.props.statusText ? <div className='alert alert-info'>{this.props.statusText}</div> : ''}
          <div className="row">
            <div className="input-field col s12">
              <input type="email" className="validate" id="email" required
                valueLink={this.linkState("email")} />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input type="password" className="validate" id="password" required
                valueLink={this.linkState("password")} />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button type="submit"
            className="btn btn-lg"
            disabled={this.props.isAuthenticating}
            onClick={this.signIn.bind(this)}>Submit</button>
        </form>
      </div>
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

reactMixin(EmailSignInForm.prototype, LinkedStateMixin);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSignInForm);
