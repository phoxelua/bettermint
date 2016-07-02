import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as actionCreators from "../../../actions/financial/goals";
import GoalView from "../components/GoalView";

const mapStateToProps = (state) => {
  return {
    goals: state.financial.goals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalView);
