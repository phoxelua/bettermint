import React, { PropTypes } from 'react';

const GoalsView = (props) => {
  return (
    <div>
      <h2>Goals</h2>
      {props.children}
    </div>
  );
};

GoalsView.propTypes = {
  children: PropTypes.object.isRequired,
};

export default GoalsView;
