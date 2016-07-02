import { bindActionCreators } from "redux";
import * as React from "react";
import { connect } from "react-redux";

import * as actionCreators from "../actions/auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface ICoreLayoutProps extends React.Props<any> {
    actions: any;
    children: any;
    isAuthenticated: boolean;
}

export const CoreLayout = ({ actions, children, isAuthenticated }: ICoreLayoutProps) => {
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
