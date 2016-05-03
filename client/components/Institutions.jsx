import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'actions/financial';

const Institution = ({ institution, onDelete }) => {
  console.log(onDelete);
  const _onDelete = () => {
    onDelete(institution);
  };

  return (
    <div>
      <button onClick={_onDelete}>Remove {institution}</button>
    </div>
  );
};

class Institutions extends Component {
  handleOnDelete = (institution) => {
    this.props.actions.deleteInstitution(institution, this.props.token);
  }

  render() {
    return (
      <div>
        {!!this.props.institutions.length &&
          <div>
            {this.props.institutions.map(institution => (
              <div key={institution}>
                <Institution institution={institution} onDelete={this.handleOnDelete} />
              </div>
            ))}
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    institutions: state.financial.institutions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Institutions);
