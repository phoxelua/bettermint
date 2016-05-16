import React, { PropTypes } from 'react';

const Accounts = (props) => {
  return (
    <div>
      {!!props.accounts.length &&
        <h1>Accounts</h1>
      }
      {!!props.accounts.length &&
        <table>
          <colgroup>
            <col span="1" style={{ width: 10 + '%' }}></col>
            <col span="1" style={{ width: 30 + '%' }}></col>
            <col span="1" style={{ width: 10 + '%' }}></col>
            <col span="1" style={{ width: 25 + '%' }}></col>
            <col span="1" style={{ width: 25 + '%' }}></col>
          </colgroup>
          <tbody>
            <tr>
              <th>Institution</th>
              <th>Name</th>
              <th>Number</th>
              <th>Available Balance</th>
              <th>Current Balance</th>
            </tr>
            {props.accounts.map(account => (
              <tr key={account._id}>
                <td>{account.institutionType}</td>
                <td>{account.meta.name}</td>
                <td>...{account.meta.number}</td>
                <td>${account.balance.available.toFixed(2)}</td>
                <td>${account.balance.current.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
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
