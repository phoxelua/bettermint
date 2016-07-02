import * as React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer>
      <div className="CoreLayout__footer__wrapper">
        <ul className="CoreLayout__links CoreLayout__footer__links">
          <li><Link to="about">About</Link></li>
          <li><Link to="privacy">Privacy</Link></li>
          <li className=""><span>© 2016 Matcha</span></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
