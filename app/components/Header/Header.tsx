import * as React from "react";
import { Link } from "react-router";
import Dropdown, { DropdownTrigger, DropdownContent } from "react-simple-dropdown";

interface IHeaderProps extends React.Props<any> {
  isAuthenticated: boolean;
  onLogOut: () => void;
};

const Header = ({ isAuthenticated, onLogOut }: IHeaderProps) => {
  const logOutButton = <li onClick={onLogOut}>Log out</li>;

  return (
    <header>
      <nav className="CoreLayout__nav">
        <div className="CoreLayout__nav__wrapper">
          <Link to="/" className="home-link">$$$</Link>
          <ul className="CoreLayout__links CoreLayout__nav__links--desktop">
            <li><Link to="/transactions">Transactions</Link></li>
            <li><Link to="/goals">Goals</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            {
              isAuthenticated
                ? logOutButton
                : null
            }
          </ul>
          <Dropdown className="CoreLayout__nav__mobile-dropdown">
            <DropdownTrigger>
              <i className="material-icons">menu</i>
            </DropdownTrigger>
            <DropdownContent>
              <ul>
                <li><Link to="transactions">Transactions</Link></li>
                <li><Link to="goals">Goals</Link></li>
                <li><Link to="profile">Profile</Link></li>
                {
                  isAuthenticated
                    ? logOutButton
                    : null
                }
              </ul>
            </DropdownContent>
          </Dropdown>
        </div>
      </nav>
    </header>
  );
};

export default Header;
