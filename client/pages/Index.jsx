import React, { Component } from 'react';
import Kittens from '../components/Kittens';
import { connect } from 'react-redux';
import { requestKittens } from '../actions/kittens';

export default class Index extends Component {
  componentDidMount() {
    this.props.requestKittens();
  }

  render() {
    const { sheet } = this.props;

    return (
      <div className="index">
        <Kittens />
      </div>
    );
  }
}

export default connect(
  () => ({}),
  { requestKittens }
)(Index);
