import React, { Component, PropTypes } from 'react';

class Transaction extends Component {
  static propTypes = {
    transaction: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired
    }).isRequired
  }

  render () {
    return (
      <div style={{marginBottom: '10px'}}>
        <div>Name: {this.props.transaction.name}</div>
        <div>Amount: {this.props.transaction.amount.toFixed(2)}</div>
        <div>Date: {this.props.transaction.date}</div>
      </div>
    )
  }
};

export default Transaction;
