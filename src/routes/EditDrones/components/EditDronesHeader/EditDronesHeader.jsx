import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './EditDronesHeader.scss';

/*
* EditDronesHeader
*/

export const EditDronesHeader = () => (
  <div styleName="edit-drone-header">
    <div styleName="title">Edit Drones</div>
  </div>
);

EditDronesHeader.propTypes = {
};

export default CSSModules(EditDronesHeader, styles);
