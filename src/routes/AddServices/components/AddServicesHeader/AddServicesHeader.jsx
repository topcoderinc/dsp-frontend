import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './AddServicesHeader.scss';

/* AddServicesHeader */

export const AddServicesHeader = () => (
  <div styleName="edit-drone-header">
    <div styleName="title">Add Services</div>
  </div>
);


export default CSSModules(AddServicesHeader, styles);
