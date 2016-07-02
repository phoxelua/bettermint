import { bindActionCreators } from "redux";
import { reduxForm } from "redux-form";

import * as actionCreators from "../actions";
import ProfileInfoForm from "../components/ProfileInfoForm";

const fields = ["email", "currentPassword", "newPassword", "birthday"];

const validate = values => {
  const errors = {};

  return errors;
};

const mapStateToProps = (state) => {
  const userProfile = state.profile.userProfile;

  const initialValues = {
    email: userProfile.email,
    birthday: userProfile.birthday && new Date(userProfile.birthday).toISOString().substring(0, 10),
  };

  return {
    isUpdating: state.profile.isUpdating,
    didUpdate: state.profile.didUpdate,
    initialValues,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

export default reduxForm({
  form: "ProfileInfoForm",
  fields,
  validate,
},
mapStateToProps,
mapDispatchToProps
)(ProfileInfoForm);
