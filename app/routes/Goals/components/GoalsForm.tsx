import * as React from "react";

interface IGoalsFormProps {
  fields?: any;
  handleSubmit?: (f) => void;
  submitting?: boolean;
  actions?: {
    createGoal: (fields) => void;
  };
}

class GoalsForm extends React.Component<IGoalsFormProps, any> {
  _handleSubmit = (_fields) => {
    this.props.actions.createGoal(_fields);
  };

  render () {
    const {
      fields: {
        name,
        amount,
        startDate,
        endDate,
      },
      handleSubmit,
      submitting,
    } = this.props;

    return (
      <form onSubmit={handleSubmit(this._handleSubmit)}>
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
  }
};

export default GoalsForm;
