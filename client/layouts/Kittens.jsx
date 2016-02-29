import React, { Component } from 'react';
import Header from 'components/Header';
import Kittens from 'components/Kittens';
import { connect } from 'react-redux';
import { requestKittens } from 'actions/kittens';

export default class KittensPage extends Component {
  componentDidMount() {
    this.props.requestKittens();
  }

  render() {
    const { sheet } = this.props;

    return (
      <div>
        <Header />
        <Kittens />
      </div>
    );
  }
};

export default connect(
  () => ({}),
  { requestKittens }
)(KittensPage);