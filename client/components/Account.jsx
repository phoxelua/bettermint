import React, { Component, PropTypes } from 'react';

class Account extends Component {
  static propTypes = {
    account: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      meta: PropTypes.shape({
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
      }).isRequired,
      institutionType: PropTypes.string.isRequired,
      balance: PropTypes.shape({
        available: PropTypes.number.isRequired,
        current: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  }

  render () {
    return (
      <div style={{marginBottom: '10px'}}>
        <div>Name: {this.props.account.meta.name}</div>
        <div>Last 4: {this.props.account.meta.number}</div>
        <div>Institution: {this.props.account.institutionType}</div>
        <div>Balance Available: {this.props.account.balance.available.toFixed(2)}</div>
        <div>Balance Current: {this.props.account.balance.current.toFixed(2)}</div>
      </div>
    )
  }
};

export default Account;
