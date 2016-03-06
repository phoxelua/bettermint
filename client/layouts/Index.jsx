import React, { Component } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

export default class IndexPage extends Component {
  render() {
    return (
      <div className="index-page">
        <Header />
        <main>
          <div className="hero container">
            <h1 className="header center">Mint, but better</h1>
            <div className="row center">
              <h5 className="header col s12 light">
                Manage your money automatically, the way you want to.
              </h5>
            </div>
            <div className="row center">
              <a className="waves-effect waves-light btn-large">Get Started</a>
            </div>
          </div>
          <div className="details container">
            <div className="row">
              <div className="col s12 m4 center">
                <h5>Organize your transactions</h5>
                <p className="light">
                  Use Venmo, Square Cash, or other social payment platforms? We'll take care of you.
                  Split and recategorize your payments and credits however you'd like.
                </p>
              </div>
              <div className="col s12 m4 center">
                <h5>Build your financial goals</h5>
                <p className="light">
                  Keep track of whatever you what to.
                  Your goals can be spending or saving across any types of accounts and any types of transactions.
                </p>
              </div>
              <div className="col s12 m4 center">
                <h5>Save more money</h5>
                <p className="light">
                  With your help, we can analyze your transactions and goals to help you achieve your goals faster.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
};

export default IndexPage;
