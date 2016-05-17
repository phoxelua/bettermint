import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'actions/financial/institutions';
import ProfileView from '../components/ProfileView';

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    institutions: state.financial.institutions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileView);
