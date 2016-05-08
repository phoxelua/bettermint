import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'actions/financial/institutions';

const Institution = ({ institution, onDelete }) => {
  const _onDelete = () => {
    onDelete(institution);
  };

  return (
    <div>
      <button onClick={_onDelete}>Remove {institution}</button>
    </div>
  );
};

Institution.propTypes = {
  institution: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const Institutions = ({ actions, token, institutions }) => {
  const handleOnDelete = (institution) => {
    actions.deleteInstitution(institution, token);
  };

  return (
    <div>
      {!!institutions.length &&
        <div>
          {institutions.map(institution => (
            <div key={institution}>
              <Institution institution={institution} onDelete={handleOnDelete} />
            </div>
          ))}
        </div>
      }
    </div>
  );
};

Institutions.propTypes = {
  actions: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  institutions: PropTypes.arrayOf(PropTypes.string),
};

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
