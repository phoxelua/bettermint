import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'actions/financial';

export default class TransactionsView extends Component {
  componentDidMount () {
    this.props.actions.requestTransactions('chase');
  };

  render() {
    return (
      <div>
        <div>Transactions</div>
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
)(TransactionsView);
