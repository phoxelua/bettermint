import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import * as actionCreators from 'actions/financial/goals';

const fields = ['name', 'amount', 'startDate', 'endDate'];

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.amount) {
    errors.amount = 'Required';
  }

  if (!values.startDate) {
    errors.startDate = 'Required';
  }

  if (!values.endDate) {
    errors.endDate = 'Required';
  }

  return errors;
};

class GoalForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
  };

  handleSubmit = (_fields) => {
    console.log(_fields);
    this.props.actions.createGoal(_fields, this.props.token);
  }

  render() {
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
      <form className="GoalForm" onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
        <div className="GoalForm__input-group">
          <label>Name</label>
          <div className="GoalForm__input-wrapper">
            <input type="text" placeholder="Cool Goal 1" {...name} />
            {
              name.touched &&
              name.error &&
              <span className="GoalForm__input-wrapper__error">{name.error}</span>
            }
          </div>
        </div>
        <div className="GoalForm__input-group">
          <label>Amount</label>
          <div className="GoalForm__input-wrapper">
            <input type="number" placeholder="5000" {...amount} />
            {
              amount.touched &&
              amount.error &&
              <span className="GoalForm__input-wrapper__error">{amount.error}</span>
            }
          </div>
        </div>
        <div className="GoalForm__input-group">
          <label>Start Date</label>
          <div className="GoalForm__input-wrapper">
            <input type="date" {...startDate} />
            {
              startDate.touched &&
              startDate.error &&
              <span className="GoalForm__input-wrapper__error">{startDate.error}</span>
            }
          </div>
        </div>
        <div className="GoalForm__input-group">
          <label>End Date</label>
          <div className="GoalForm__input-wrapper">
            <input type="date" {...endDate} />
            {
              endDate.touched &&
              endDate.error &&
              <span className="GoalForm__input-wrapper__error">{endDate.error}</span>
            }
          </div>
        </div>
        <div className="GoalForm__input-group GoalForm__submit">
          <button type="submit" className="" disabled={submitting}>
            {submitting ? <i/> : <i/>} Submit
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

export default reduxForm({
  form: 'goalForm',
  fields,
  validate,
},
mapStateToProps,
mapDispatchToProps
)(GoalForm);
