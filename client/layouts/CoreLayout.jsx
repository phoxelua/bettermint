import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from 'components/Header';
import Footer from 'components/Footer';

export const CoreLayout = (props) => {
  return (
    <div className="CoreLayout">
      <Header />

      <main>
        { props.children }
      </main>

      <Footer />
    </div>
  );
};

CoreLayout.propTypes = {
  children: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoreLayout);
