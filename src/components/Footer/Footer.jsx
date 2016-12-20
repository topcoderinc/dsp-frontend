import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Footer.scss';

export const Footer = () => (
  <div styleName="footer">
    <p styleName="copyright">Copyright © Drone Website. All Rights Reserved</p>

    <nav styleName="menu">
      <a styleName="menu-item" href="javascript:;">Disclaimer</a>
      <a styleName="menu-item" href="javascript:;">Privacy Policy</a>
      <a styleName="menu-item" href="javascript:;">Terms & Conditions</a>
    </nav>
  </div>
);


export default CSSModules(Footer, styles);

