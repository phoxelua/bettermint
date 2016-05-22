import React, { Component, PropTypes } from 'react';
import Institutions from '../containers/InstitutionsContainer';
import PlaidLink from 'components/PlaidLink';

class ProfileView extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    institutions: PropTypes.array,
    actions: PropTypes.object,
  }

  componentDidMount() {
    this.props.actions.requestInstitutions(this.props.token);
  }


  handleSuccess = () => {
    this.props.actions.requestInstitutions(this.props.token);
  }

  render() {
    return (
      <div>
        <div>Profile</div>
        <Institutions institutions={this.props.institutions} />
        <PlaidLink
          publicKey="8c9aa6b52c1b8022eacd7c80408c4d"
          product="connect"
          env="tartan"
          clientName="testing"
          onSuccess={this.handleSuccess}
          authToken={this.props.token}
        />
      </div>
    );
  }
}

export default ProfileView;