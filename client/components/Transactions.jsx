import React from 'react';
import Transaction from 'components/Transaction';

const Transactions = () => {
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

export default Transactions;
