import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Footer.scss';

export const Footer = () => (
  <div styleName="footer">
    <div styleName="copyright">
      Copyright © Drone Website. All Rights Reserved
    </div>
    <ul>
      <li><a href="#">Disclaimer</a></li>
      <li><a href="#">Privacy Policy</a></li>
      <li><a href="#">Terms & Conditions</a></li>
    </ul>
  </div>
);

export default CSSModules(Footer, styles);
