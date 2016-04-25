import React, { Component } from 'react';
import Transaction from 'components/Transaction';

import { connect } from 'react-redux';

class Transactions extends Component {
  render () {
    return (
      <div>
        {!!this.props.transactions.length &&
          <h1>Transactions</h1>
        }
        {!!this.props.transactions.length &&
          <div>
            {this.props.transactions.map(transaction => (
              <Transaction key={transaction._id} transaction={transaction} />
            ))}
          </div>
        }
      </div>
    );
  };
};

const mapStateToProps = function(state) {
  return {
    transactions: state.financial.transactions
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
