import * as React from "react";

import GoalsTable from "./GoalsTable";
import GoalsForm from "../containers/GoalsFormContainer";

interface IGoalsListViewProps {
  actions: any;
  goals: any[];
}

class GoalsListView extends React.Component<IGoalsListViewProps, any> {
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

export default GoalsListView;
