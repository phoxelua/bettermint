import React from 'react';

import Goal from './Goal';

const GoalView = (props) => {
  return (
    <div>
      <Goal goal={props.goals && props.goals.filter((goal) => goal.id === parseInt(props.params.id, 10))} />
    </div>
  );
};

export default GoalView;
