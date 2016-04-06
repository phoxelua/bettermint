import React, { Component } from 'react';
import { connect } from 'react-redux';

export default class ProfileView extends Component {
  componentDidMount () {
    console.log(this);
  }

  render () {
    return (
      <div>
        <div>Profile</div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView);
