import React, { Component, PropTypes } from 'react';

class Transaction extends Component {
  // TODO: Enforce PropTypes
  // static propTypes = {
  //   kitten: PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //     created: PropTypes.string.isRequired
  //   }).isRequired
  // };

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
