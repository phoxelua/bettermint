import React, { Component, PropTypes } from 'react';
import Institutions from '../containers/InstitutionsContainer';
import ProfileInfoForm from '../containers/ProfileInfoFormContainer';
import PlaidLink from 'components/PlaidLink';

class ProfileView extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    institutions: PropTypes.array,
    institutionActions: PropTypes.object,
    profileActions: PropTypes.object,
  }

  componentDidMount() {
    this.props.institutionActions.requestInstitutions(this.props.token);
    this.props.profileActions.fetchUserProfile(this.props.token);
  }


  handleSuccess = () => {
    this.props.institutionActions.requestInstitutions(this.props.token);
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
        <ProfileInfoForm />
      </div>
    );
  }
}

export default ProfileView;
