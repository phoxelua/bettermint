import React, { PropTypes } from 'react';
import { Table, Tr, Td, Sort } from 'reactable';

const Accounts = ({ accounts }) => {
  return (
    <div>
      <h1>Accounts</h1>
      <Table
        columns={[
          { key: 'institution', label: 'Institution' },
          { key: 'name', label: 'Name' },
          { key: 'number', label: 'Number' },
          { key: 'available', label: 'Available Balance' },
          { key: 'current', label: 'Current Balance' },
        ]}
        sortable={[
          'institution',
          'name',
          'number',
          { column: 'available', sortFunction: Sort.Numeric },
          { column: 'current', sortFunction: Sort.Numeric },
        ]}
      >
        {accounts.map((account) => (
          <Tr>
            <Td column="institution">{account.institutionType}</Td>
            <Td column="name">{account.meta.name}</Td>
            <Td column="number">...{account.meta.number}</Td>
            <Td column="available">${account.balance.available.toFixed(2)}</Td>
            <Td column="current">${account.balance.current.toFixed(2)}</Td>
          </Tr>
        ))}
      </Table>
    </div>
  );
};

Accounts.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    meta: PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
    institutionType: PropTypes.string.isRequired,
    balance: PropTypes.shape({
      available: PropTypes.number.isRequired,
      current: PropTypes.number.isRequired,
    }).isRequired,
  })).isRequired,
};

export default Accounts;
