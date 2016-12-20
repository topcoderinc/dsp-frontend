import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './Footer.scss';

export const Footer = () => (
  <div styleName="footer">
    <div styleName="footer-content">
      <div styleName="copy-right">Copyright © Drone Website. All Rights Reserved </div>
      <nav styleName="footer-nav">
        <ul>
          <li>
            <a href="javascript:;">Disclaimer</a>
          </li>
          <li>
            <a href="javascript:;">Privacy Policy</a>
          </li>
          <li>
            <a href="javascript:;">Terms & Conditions</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);


export default CSSModules(Footer, styles);

