import React from 'react';
import CSSModules from 'react-css-modules';
import Button from 'components/Button';
import styles from './MyDroneHeader.scss';
import {browserHistory} from 'react-router';


/*
* MyDroneHeader
*/

export const MyDroneHeader = () => (
  <div styleName="my-drone-header">
    <div styleName="title">My Drones</div>
    <div styleName="add-drone-btn">
      <Button
        color="blue" className={styles.btnAddDrone} onClick={() => {
          browserHistory.push('edit-drones');
        }}
      >Add Drone</Button>
    </div>
  </div>
);

MyDroneHeader.propTypes = {
};

export default CSSModules(MyDroneHeader, styles);
