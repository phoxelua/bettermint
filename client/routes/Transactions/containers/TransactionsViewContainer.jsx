import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as transactionActionCreators from 'actions/financial/transactions';
import * as institutionActionCreators from 'actions/financial/institutions';
import TransactionsView from '../components/TransactionsView';

const mapStateToProps = (state) => {
  return {
    institutions: state.financial.institutions,
    transactions: state.financial.transactions,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    institutionActions: bindActionCreators(institutionActionCreators, dispatch),
    transactionActions: bindActionCreators(transactionActionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsView);
