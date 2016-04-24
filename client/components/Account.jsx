import React, { Component, PropTypes } from 'react';

class Account extends Component {
  // TODO: Enforce PropTypes
  // static propTypes = {
  //   kitten: PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //     created: PropTypes.string.isRequired
  //   }).isRequired
  // };

  componentDidMount () {
    console.log(this.props.accoujnt)
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
