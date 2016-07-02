import * as React from "react";
import Institutions from "../containers/InstitutionsContainer";
import ProfileInfoForm from "../containers/ProfileInfoFormContainer";
import PlaidLink from "../../../components/PlaidLink";

interface IProfileViewProps extends React.Props<any> {
    institutions: string[];
    institutionActions: any;
    profileActions: any;
}

class ProfileView extends React.Component<IProfileViewProps, {}> {
  componentDidMount() {
    this.props.institutionActions.requestInstitutions();
    this.props.profileActions.fetchUserProfile();
  }

  handleSuccess = () => {
    this.props.institutionActions.requestInstitutions();
  }

  render() {
    return (
      <div>
        <div>Profile</div>
        <Institutions />
        <PlaidLink
          publicKey="8c9aa6b52c1b8022eacd7c80408c4d"
          product="connect"
          env="tartan"
          clientName="testing"
          onSuccess={this.handleSuccess}
        />
        <ProfileInfoForm />
      </div>
    );
  }
}

export default ProfileView;
