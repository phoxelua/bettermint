import React, { Component } from 'react';
import 'vendor/materialize.js';
import 'jQuery';

export default class Header extends Component {

  componentDidMount() {
    $(".dropdown-button").dropdown();
  }

  render() {
    return (
      <header>
        <ul className="dropdown-content" id="mobile-nav-dropdown">
          <li><a href="sass.html">Transactions</a></li>
          <li><a href="badges.html">Goals</a></li>
          <li><a href="collapsible.html">Profile</a></li>
        </ul>
        <nav className="teal accent-4">
          <div className="nav-wrapper container">
            <a href="#!" className="brand-logo">$$$</a>
            <ul className="right hide-on-med-and-down">
              <li><a href="sass.html">Transactions</a></li>
              <li><a href="badges.html">Goals</a></li>
              <li><a href="collapsible.html">Profile</a></li>
            </ul>
            <a href="#" data-activates="mobile-nav-dropdown" className="dropdown-button right hide-on-large-only"><i className="material-icons">menu</i></a>
          </div>
        </nav>
      </header>
    );
  }
};

export default Header;
