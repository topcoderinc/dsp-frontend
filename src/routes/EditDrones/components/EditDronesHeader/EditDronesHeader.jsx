import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './EditDronesHeader.scss';

/*
* EditDronesHeader
*/

export const EditDronesHeader = ({drone}) => (
  <div styleName="edit-drone-header">
    <div styleName="title">{drone ? 'Edit Drone' : 'Add Drone'}</div>
  </div>
);

EditDronesHeader.propTypes = {
  drone: PropTypes.string,
};

export default CSSModules(EditDronesHeader, styles);
