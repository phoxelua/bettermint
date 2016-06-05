import React, { Component } from 'react';

import Goals from './Goals';
import GoalsForm from '../containers/GoalsFormContainer';

class GoalsView extends Component {
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
        <GoalsForm />
      </div>
    );
  }
}

export default GoalsView;
