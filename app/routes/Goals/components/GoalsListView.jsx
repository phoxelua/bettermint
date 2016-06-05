import React, { Component } from 'react';

import GoalsTable from './GoalsTable';
import GoalsForm from '../containers/GoalsFormContainer';

class Goals extends Component {
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
        <GoalsTable goals={this.props.goals} />
        <GoalsForm />
      </div>
    );
  }
}

export default Goals;
