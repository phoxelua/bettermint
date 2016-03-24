import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import reactMixin from 'react-mixin';
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import * as actionCreators from 'actions/authentication/emailSignUp';

class EmailSignUpForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
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
      <div>
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
