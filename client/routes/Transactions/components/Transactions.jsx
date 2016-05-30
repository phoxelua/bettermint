import React, { PropTypes } from 'react';
import { Table, Tr, Td, Sort } from 'reactable';
import { epochToDate } from 'utilities/date';

const Transactions = ({ transactions }) => {
  return (
    <div>
      <h1>Transactions</h1>
      <Table
        columns={[
          { key: 'post_date', label: 'Post Date' },
          { key: 'name', label: 'Name' },
          { key: 'amount', label: 'Amount' },
        ]}
        sortable={[
          { column: 'date', sortFunction: Sort.Date },
          'name',
          { column: 'amount', sortFunction: Sort.Numeric },
          'pending',
        ]}
      >
        {transactions.map((transaction) => (
          <Tr key={transaction._id}>
            <Td column="post_date">{epochToDate(transaction.post_date)}</Td>
            <Td column="name">{transaction.name}</Td>
            <Td column="amount">{transaction.amount.toFixed(2)}</Td>
          </Tr>
        ))}
      </Table>
    </div>
  );
};

Transactions.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    post_date: PropTypes.number.isRequired,
  })).isRequired,
};

export default Transactions;
