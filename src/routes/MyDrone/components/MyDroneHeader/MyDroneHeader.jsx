import React from 'react';
import CSSModules from 'react-css-modules';
import Button from 'components/Button';
import styles from './MyDroneHeader.scss';


/*
* MyDroneHeader
*/

export const MyDroneHeader = () => (
  <div styleName="my-drone-header">
    <div styleName="title">My Drones</div>
    <div styleName="add-drone-btn">
      <Button color="blue" className={styles.btnAddDrone}>Add Drone</Button>
    </div>
  </div>
);

MyDroneHeader.propTypes = {
};

export default CSSModules(MyDroneHeader, styles);
