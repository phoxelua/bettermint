import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export class CoreLayout extends Component {

  render () {
    return (
      <div className="CoreLayout">
        <header>
          <nav className="CoreLayout__nav">
            <div className="CoreLayout__nav__wrapper">
              <Link to="/" className="home-link">$$$</Link>
              <ul className="CoreLayout__links CoreLayout__nav__links--desktop">
                <li><Link to="transactions">Transactions</Link></li>
                <li><Link to="goals">Goals</Link></li>
                <li><Link to="profile">Profile</Link></li>
              </ul>
              <Dropdown className="CoreLayout__nav__mobile-dropdown">
                <DropdownTrigger><i className="material-icons">menu</i></DropdownTrigger>
                <DropdownContent>
                  <ul>
                    <li><Link to="transactions">Transactions</Link></li>
                    <li><Link to="goals">Goals</Link></li>
                    <li><Link to="profile">Profile</Link></li>
                  </ul>
                </DropdownContent>
              </Dropdown>
            </div>
          </nav>
        </header>

        <main>
          { this.props.children }
        </main>

        <footer>
          <div className="CoreLayout__footer__wrapper">
            <ul className="CoreLayout__links CoreLayout__footer__links">
              <li><Link to="/about">About</Link></li>
              <li><Link to="/privacy">Privacy</Link></li>
              <li className=""><span>© 2016 Bettermint</span></li>
            </ul>
          </div>
        </footer>
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(CoreLayout);
