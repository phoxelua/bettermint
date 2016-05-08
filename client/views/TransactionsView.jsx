import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as transactionActionCreators from 'actions/financial/transactions';
import * as institutionActionCreators from 'actions/financial/institutions';
import Transactions from 'components/Transactions';
import { simpleEquals } from 'utilities/equality';

export default class TransactionsView extends Component {
  static propTypes = {
    institutionActions: PropTypes.object.isRequired,
    transactionActions: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    institutions: PropTypes.array,
    transactions: PropTypes.array,
  }

  componentDidMount() {
    this.props.institutionActions.requestInstitutions(this.props.token);
  }

  componentWillReceiveProps({ institutions }) {
    if (!simpleEquals(institutions, this.props.institutions)) {
      for (const institution of institutions) {
        this.props.transactionActions.requestTransactions(institution, this.props.token);
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
    institutionActions: bindActionCreators(institutionActionCreators, dispatch),
    transactionActions: bindActionCreators(transactionActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsView);
