import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './DroneInfoDetails.scss';

/*
* DroneInfoDetails
*/

export const DroneInfoDetails = ({drone}) => (
  <div styleName="drone-info-details">
    {drone.imageUrl && <img src={drone.imageUrl} alt="drone image" />}
    <div styleName="drone-info">
      <h4>{drone.name}</h4>
      <h6>Serial number {drone.serialNumber}</h6>
      {drone.description && <p>{drone.description}</p>}
    </div>
    {/* drone-info end */}
  </div>
);

DroneInfoDetails.propTypes = {
  drone: PropTypes.object.isRequired,
};

export default CSSModules(DroneInfoDetails, styles);
