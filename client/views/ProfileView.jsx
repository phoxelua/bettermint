import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'actions/financial';
import Accounts from 'containers/Accounts';

export default class ProfileView extends Component {
  componentDidMount () {
    this.props.actions.requestTransactions('chase');
  };

  render () {
    return (
      <div>
        <div>Profile</div>

        <Accounts />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView);
