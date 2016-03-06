import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutAndRedirect } from 'redux/actions/user';

import 'vendor/materialize.js';
import 'jQuery';


const isAuthenticated = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export class CoreLayout extends Component {

  componentDidMount() {
    $(".dropdown-button").dropdown();
  }

  render () {

    const { dispatch } = this.props;

    return (
      <div>
        <header>
          <ul className="dropdown-content" id="mobile-nav-dropdown">
            <li><Link to="transactions">Transactions</Link></li>
            <li><Link to="goals">Goals</Link></li>
            <li><Link to="profile">Profile</Link></li>
          </ul>
          <nav className="teal accent-4">
            <div className="nav-wrapper container">
              <Link to="/" className="brand-logo">$$$</Link>
              <ul className="right hide-on-med-and-down">
                <li><Link to="transactions">Transactions</Link></li>
                <li><Link to="goals">Goals</Link></li>
                <li><Link to="profile">Profile</Link></li>
              </ul>
              <Link
                to="#"
                data-activates="mobile-nav-dropdown"
                className="dropdown-button right hide-on-large-only">
                <i className="material-icons">menu</i>
              </Link>
            </div>
          </nav>
        </header>

        <main>
          <div className='container'>
            { this.props.children }
          </div>
        </main>

        <footer className="teal accent-4">
          <div className="container">
            <ul className="links">
              <li><Link to="/about" className="grey-text text-lighten-4">About</Link></li>
              <li><Link to="/privacy" className="grey-text text-lighten-4">Privacy</Link></li>
              <li className="flex-right grey-text text-lighten-3"><span>© 2016 Bettermint</span></li>
            </ul>
          </div>
        </footer>
      </div>

    );
  }
}

export default connect(isAuthenticated)(CoreLayout);
