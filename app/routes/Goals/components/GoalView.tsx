import * as React from "react";

import Goal from "./Goal";

interface IGoalViewProps {
  goals: any;
  params: {
    id: string;
  };
}

class GoalView extends React.Component<IGoalViewProps, any> {
  render () {
    return (
      <div>
        <Goal
          goal={
            this.props.goals
              && this.props.goals.filter((goal) => goal.id === parseInt(this.props.params.id, 10))
          }
        />
      </div>
    );
  }
};

export default GoalView;
