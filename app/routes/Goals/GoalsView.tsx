import * as React from "react";

interface IGoalsViewProps {
  children: any;
}

const GoalsView = (props: IGoalsViewProps) => {
  return (
    <div>
      <h2>Goals</h2>
      {props.children}
    </div>
  );
};

export default GoalsView;
