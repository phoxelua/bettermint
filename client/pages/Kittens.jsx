import React, { Component } from 'react';
import Header from '../containers/Header';
import Footer from '../containers/Footer';
import Kittens from '../components/Kittens';
import { connect } from 'react-redux';
import { requestKittens } from '../actions/kittens';

export default class KittensPage extends Component {
  componentDidMount() {
    this.props.requestKittens();
  }

  render() {
    const { sheet } = this.props;

    return (
      <div className="index">
        <Header />
        <Kittens />
        <Footer />
      </div>
    );
  }
};

export default connect(
  () => ({}),
  { requestKittens }
)(KittensPage);
