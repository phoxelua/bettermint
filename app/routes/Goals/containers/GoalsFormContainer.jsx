import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';

import * as actionCreators from 'actions/financial/goals';
import GoalsForm from '../components/GoalsForm';

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
  form: 'goalsForm',
  fields,
  validate,
},
mapStateToProps,
mapDispatchToProps
)(GoalsForm);
