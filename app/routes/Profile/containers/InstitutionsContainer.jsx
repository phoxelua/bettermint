import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../../../actions/financial/institutions';
import Institutions from '../components/Institutions';

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
)(Institutions);
