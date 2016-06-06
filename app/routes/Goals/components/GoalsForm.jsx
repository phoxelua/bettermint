import React, { PropTypes } from 'react';

const GoalsForm = (props) => {
  const _handleSubmit = (_fields) => {
    console.log(_fields);
    props.actions.createGoal(_fields);
  };

  const {
    fields: {
      name,
      amount,
      startDate,
      endDate,
    },
    handleSubmit,
    submitting,
  } = props;

  return (
    <form onSubmit={handleSubmit(_handleSubmit)}>
      <div>
        <label>Name</label>
        <div>
          <input type="text" placeholder="Cool Goal 1" {...name} />
          {
            name.touched &&
            name.error &&
            <span>{name.error}</span>
          }
        </div>
      </div>
      <div>
        <label>Amount</label>
        <div>
          <input type="number" placeholder="5000" {...amount} />
          {
            amount.touched &&
            amount.error &&
            <span>{amount.error}</span>
          }
        </div>
      </div>
      <div>
        <label>Start Date</label>
        <div>
          <input type="date" {...startDate} />
          {
            startDate.touched &&
            startDate.error &&
            <span>{startDate.error}</span>
          }
        </div>
      </div>
      <div>
        <label>End Date</label>
        <div>
          <input type="date" {...endDate} />
          {
            endDate.touched &&
            endDate.error &&
            <span>{endDate.error}</span>
          }
        </div>
      </div>
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </div>
    </form>
  );
};

GoalsForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    createGoal: PropTypes.func.isRequired,
  }).isRequired,
};

export default GoalsForm;
