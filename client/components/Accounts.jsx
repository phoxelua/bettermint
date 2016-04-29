import React from 'react';
import Account from 'components/Account';

const Accounts = () => {
  return (
    <div>
      {!!this.props.accounts.length &&
        <h1>Accounts</h1>
      }
      {!!this.props.accounts.length &&
        <div>
          {this.props.accounts.map(account => (
            <Account key={account._id} account={account} />
          ))}
        </div>
      }
    </div>
  );
};

export default Accounts;
