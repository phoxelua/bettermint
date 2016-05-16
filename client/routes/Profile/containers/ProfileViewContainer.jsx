import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'actions/financial/institutions';
import Profile from 'components/Profile';

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
)(Profile);
