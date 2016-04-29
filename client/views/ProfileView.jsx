import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'actions/financial';
import Accounts from 'components/Accounts';
import PlaidLink from 'components/PlaidLink';

class ProfileView extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    accounts: PropTypes.array,
    actions: PropTypes.object,
  }

  handleSuccess() {
    console.log('hey');
  }

  render() {
    return (
      <div>
        <div>Profile</div>
        <Accounts accounts={this.props.accounts} />
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
    accounts: state.financial.accounts,
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
