import React, { PropTypes } from 'react';
import { epochToDate } from 'utilities/date';

const transactionSortFunction = (a, b) => {
  if (a.date > b.date) {
    return -1;
  } else if (a.date === b.date) {
    return 0;
  } else {
    return 1;
  }
};

const Transactions = (props) => {
  return (
    <div>
      {!!props.transactions.length &&
        <h1>Transactions</h1>
      }
      {!!props.transactions.length &&
        <table>
          <colgroup>
            <col span="1" style={{ width: 20 + '%' }}></col>
            <col span="1" style={{ width: 40 + '%' }}></col>
            <col span="1" style={{ width: 20 + '%' }}></col>
            <col span="1" style={{ width: 20 + '%' }}></col>
          </colgroup>
          <tbody>
            <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Debit</th>
                <th>Credit</th>
              </tr>
            {props.transactions.sort(transactionSortFunction).map(transaction => (
              <tr key={transaction._id}>
                <td>{epochToDate(transaction.date)}</td>
                <td>{transaction.name}</td>
                <td>{
                  transaction.amount >= 0
                    ? transaction.amount.toFixed(2)
                    : ''
                }</td>
                <td>{
                  transaction.amount < 0
                    ? (-transaction.amount).toFixed(2)
                    : ''
                }</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

Transactions.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
};

export default Transactions;
