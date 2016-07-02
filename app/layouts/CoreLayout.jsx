import { bindActionCreators } from 'redux';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/auth';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const CoreLayout = ({ actions, children, isAuthenticated }) => {
  const handleLogOut = () => {
    actions.signOutAndRedirect();
  };

  return (
    <div className="CoreLayout">
      <Header
        isAuthenticated={isAuthenticated}
        onLogOut={handleLogOut}
      />

      <main>
        { children }
      </main>

      <Footer />
    </div>
  );
};

CoreLayout.propTypes = {
  actions: PropTypes.object,
  children: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
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
)(CoreLayout);
