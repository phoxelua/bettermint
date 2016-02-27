import React, { Component } from 'react';
import Header from '../containers/Header';
import Footer from '../containers/Footer';

export default class TransactionsPage extends Component {
  render() {
    return (
      <div className="Transactions">
        <Header />
        <div>Transactions</div>
        <Footer />
      </div>
    );
  }
};
