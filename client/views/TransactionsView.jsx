import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'actions/financial/transactions';
import Transactions from 'components/Transactions';

export default class TransactionsView extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    institutions: PropTypes.array,
    transactions: PropTypes.array,
  }

  componentDidMount() {
    this.props.actions.requestInstitutions(this.props.token);
  }

  componentWillReceiveProps({ institutions }) {
    if (JSON.stringify(institutions) !== JSON.stringify(this.props.institutions)) {
      for (const institution of institutions) {
        this.props.actions.requestTransactions(institution, this.props.token);
      }
    }
  }

  render() {
    return (
      <div>
        <Transactions transactions={this.props.transactions} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    institutions: state.financial.institutions,
    transactions: state.financial.transactions,
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
)(TransactionsView);
