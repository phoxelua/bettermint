import React, { PropTypes, Component } from 'react';

import GoalsTable from './GoalsTable';
import GoalsForm from '../containers/GoalsFormContainer';

class Goals extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      requestGoals: PropTypes.func.isRequired,
    }).isRequired,
    goals: PropTypes.array.isRequired,
  }

  static defaultProps = {
    fields: {
      name: {},
      amount: {},
      start: {},
      end: {},
    },
  }

  componentDidMount() {
    this.props.actions.requestGoals();
  }

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
