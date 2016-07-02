import * as React from "react";

import Transactions from "./Transactions";
import { simpleEquals } from "../../../utilities/equality";

interface ITransactionsViewProps extends React.Props<any> {
  institutionActions: any;
  transactionActions: any;
  institutions: any[];
  transactions: any[];
}

class TransactionsView extends React.Component<ITransactionsViewProps, any> {

  componentDidMount() {
    this.props.institutionActions.requestInstitutions();
  }

  componentWillReceiveProps({ institutions }) {
    if (!simpleEquals(institutions, this.props.institutions)) {
      for (const institution of institutions) {
        this.props.transactionActions.requestTransactions(institution);
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

export default TransactionsView;
