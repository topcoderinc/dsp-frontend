import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './DroneInfoDetails.scss';

const getImage = (name) => `${window.location.origin}/img/myDrones/${name}`;

/*
* DroneInfoDetails
*/

export const DroneInfoDetails = ({droneInfoDetails}) => (
  <div styleName="drone-info-details">
    <img src={getImage('drone-lg.png')} alt="drone thumb" />
    <div styleName="drone-info">
      <h4>{droneInfoDetails.droneName}</h4>
      <h6>Serial number {droneInfoDetails.droneSerialNum}</h6>
      <p>{droneInfoDetails.description1}</p>
      <p>{droneInfoDetails.description2}</p>
    </div>
    {/* drone-info end */}
  </div>
);

DroneInfoDetails.propTypes = {
  droneInfoDetails: PropTypes.object.isRequired,
};

export default CSSModules(DroneInfoDetails, styles);
