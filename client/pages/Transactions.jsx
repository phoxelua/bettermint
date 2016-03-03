import React, { Component } from 'react';
import Header from '../containers/Header';

export default class TransactionsPage extends Component {
  render() {
    return (
      <div className="page transactions-page">
        <Header />
        <div>Transactions</div>
      </div>
    );
  }
};
