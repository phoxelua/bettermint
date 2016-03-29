import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reactMixin from 'react-mixin';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import * as actionCreators from 'actions/auth/emailSignUp';

class EmailSignUpForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  }

  signUp (e) {
    e.preventDefault();
    this.props.actions.signUpUser(this.state.email, this.state.password);
  }

  render () {
    return (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input type="text" className="validate" id="first-name" placeholder="John" required
                valueLink={this.linkState("firstName")} />
              <label htmlFor="first-name">First Name</label>
            </div>
            <div className="input-field col s6">
              <input type="text" className="validate" id="last-name" placeholder="Doe" required
                valueLink={this.linkState("lastName")} />
              <label htmlFor="last-name">Last Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input type="email" className="validate" id="email" placeholder="john@doe.com" required
                valueLink={this.linkState("email")} />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input type="password" className="validate" id="password" placeholder="hunter2" required
                valueLink={this.linkState("password")} />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button type="submit"
            className="btn btn-lg"
            disabled={this.props.isAuthenticating}
            onClick={this.signUp.bind(this)}>Submit</button>
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

reactMixin(EmailSignUpForm.prototype, LinkedStateMixin);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailSignUpForm);
