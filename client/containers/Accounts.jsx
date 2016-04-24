import React, { Component } from 'react';
import Account from 'components/Account';

import { connect } from 'react-redux';

class Accounts extends Component {
  render () {
    return (
      <div>
        {!!this.props.accounts.length &&
          <h1>Accounts</h1>
        }
        {!!this.props.accounts.length &&
          <div>
            {this.props.accounts.map(account => (
              <div>
                <Account key={account._id} account={account} />
              </div>
            ))}
          </div>
        }
      </div>
    );
  };
};

const mapStateToProps = function(state) {
  return {
    accounts: state.financial.accounts
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accounts);
