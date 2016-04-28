import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'actions/financial';
import Accounts from 'containers/Accounts';
import PlaidLink from 'components/PlaidLink';

class ProfileView extends Component {
  handleSuccess() {
    console.log('faggot');
  }

  render() {
    return (
      <div>
        <div>Profile</div>
        <Accounts />
        <PlaidLink
          publicKey="8c9aa6b52c1b8022eacd7c80408c4d"
          product="connect"
          env="tartan"
          clientName="testing"
          onSuccess={this.handleSuccess}
          authToken={this.props.token}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView);
