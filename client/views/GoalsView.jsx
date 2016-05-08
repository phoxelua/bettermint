import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'actions/financial/goals';
import Goals from 'components/Goals';
import GoalForm from 'containers/GoalForm';

export default class GoalsView extends Component {
  static defaultProps = {
    fields: {
      name: {},
      amount: {},
      start: {},
      end: {},
    },
  }

  componentDidMount() {
    this.props.actions.requestGoals(this.props.token);
  }

  handleSubmit = () => {
    console.log(this.props.fields);
  };

  render() {
    return (
      <div>
        <Goals goals={this.props.goals} />
        <GoalForm />
      </div>
    );
  }
}

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
