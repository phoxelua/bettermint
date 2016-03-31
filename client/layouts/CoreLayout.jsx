import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Menu, { SubMenu, MenuItem } from 'rc-menu';

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export class CoreLayout extends Component {

  render () {
    return (
      <div>
        <header>
          <nav className='teal accent-4'>
            <div className='nav-wrapper container'>
              <Link to='/' className='brand-logo'>$$$</Link>
              <Menu className='right hide-on-med-and-down'>
                <MenuItem key="1"><Link to='transactions'>Transactions</Link></MenuItem>
                <MenuItem key="2"><Link to='goals'>Goals</Link></MenuItem>
                <MenuItem key="3"><Link to='profile'>Profile</Link></MenuItem>
              </Menu>
              <Menu className='right hide-on-large-only'>
                <SubMenu title={<i className='material-icons'>menu</i>} key="1">
                  <MenuItem key="1-1"><Link to='transactions'>Transactions</Link></MenuItem>
                  <MenuItem key="1-2"><Link to='goals'>Goals</Link></MenuItem>
                  <MenuItem key="1-3"><Link to='profile'>Profile</Link></MenuItem>
                </SubMenu>
              </Menu>
            </div>
          </nav>
        </header>

        <main>
          <div className='container'>
            { this.props.children }
          </div>
        </main>

        <footer className='teal accent-4'>
          <div className='container'>
            <ul className='links'>
              <li><Link to='/about' className='grey-text text-lighten-4'>About</Link></li>
              <li><Link to='/privacy' className='grey-text text-lighten-4'>Privacy</Link></li>
              <li className='flex-right grey-text text-lighten-3'><span>© 2016 Bettermint</span></li>
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
