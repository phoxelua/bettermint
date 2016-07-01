import * as React from 'react';
import { PropTypes } from 'react';
import { Table, Td, Tr, Sort } from 'reactable';

interface IAccount {
    _id: string;
    meta: {
      name: string,
      number: string,
    };
    institutionType: string;
    balance: {
      available: number,
      current: number,
    };
}

interface IAccountProps extends React.Props<any> {
  accounts: IAccount[],
}

const Accounts = ({ accounts }: IAccountProps) => {
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

export default Accounts;
