import React, { Component } from 'react';

export default class Footer extends Component {

  render() {
    return (
      <footer className="teal accent-4">
        <div className="container">
          <ul className="links">
            <li><a className="grey-text text-lighten-4" href="/about">About</a></li>
            <li><a className="grey-text text-lighten-4" href="/privacy">Privacy</a></li>
            <li className="flex-right grey-text text-lighten-3"><span>© 2016 Bettermint</span></li>
          </ul>
        </div>
      </footer>
    );
  }
};

export default Footer;
