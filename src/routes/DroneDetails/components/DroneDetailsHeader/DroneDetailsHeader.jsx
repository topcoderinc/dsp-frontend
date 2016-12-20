import React from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import Button from 'components/Button';
import styles from './DroneDetailsHeader.scss';

/*
* DroneDetailsHeader
*/

export const DroneDetailsHeader = () => (
  <div styleName="drone-details-header">
    <div styleName="title">Drone Details</div>
    <div styleName="add-drone-btn">
      <Button color="blue" className={styles.btnDeleteDrone}>Delete Drone</Button>
      <Link to="edit-drones">
        <Button color="blue" className={styles.btnEditDrone}>Edit Drone</Button>
      </Link>
    </div>
  </div>
);


export default CSSModules(DroneDetailsHeader, styles);
