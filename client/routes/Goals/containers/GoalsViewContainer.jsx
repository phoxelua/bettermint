import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'actions/financial/goals';
import GoalsView from '../components/GoalsView';

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    goals: state.financial.goals,
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
)(GoalsView);
