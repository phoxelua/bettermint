import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as institutionActions from '../../../actions/financial/institutions';
import * as profileActions from '../actions';
import ProfileView from '../components/ProfileView';

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    institutions: state.financial.institutions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    institutionActions: bindActionCreators(institutionActions, dispatch),
    profileActions: bindActionCreators(profileActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView);
