import React, { Component } from 'react';
import Kittens from 'containers/Kittens';
import { connect } from 'react-redux';
import { requestKittens } from 'actions/kittens';

export default class KittensView extends Component {
  componentDidMount() {
    this.props.requestKittens();
  }

  render() {
    const { sheet } = this.props;

    return (
      <div>
        <Kittens />
      </div>
    );
  }
};

export default connect(
  () => ({}),
  { requestKittens }
)(KittensView);
