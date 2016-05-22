import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions';
import LoginView from '../components/LoginView';

const mapStateToProps = (state) => {
  return {

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
)(LoginView);
