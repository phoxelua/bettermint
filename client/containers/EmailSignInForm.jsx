import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reactMixin from 'react-mixin';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import * as actionCreators from 'actions/authentication/emailSignIn';

class EmailSignInForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectTo: props.redirectRoute
    };
  }

  login (e) {
    e.preventDefault();
    this.props.actions.loginUser(this.state.email, this.state.password, this.state.redirectTo);
  }

  render () {
    return (
      <div>
        {this.props.statusText ? <div className='alert alert-info'>{this.props.statusText}</div> : ''}
        <form role='form'>
        <div className='form-group'>
            <input type='text'
              className='form-control input-lg'
              valueLink={this.linkState('email')}
              placeholder='Email' />
        </div>
        <div className='form-group'>
          <input type='password'
            className='form-control input-lg'
            valueLink={this.linkState('password')}
            placeholder='Password' />
        </div>
        <button type='submit'
          className='btn btn-lg'
          disabled={this.props.isAuthenticating}
          onClick={this.login.bind(this)}>Submit</button>
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
