import React, { Component, PropTypes } from 'react';
import Transactions from './Transactions';
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
