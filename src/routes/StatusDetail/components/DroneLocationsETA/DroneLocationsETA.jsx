import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './DroneLocationsETA.scss';

export const DroneLocationsETA = ({ eta }) => (
  <div styleName="drone-locations-eta">
   ETA: <span styleName="value">{eta}</span>
  </div>
);

DroneLocationsETA.propTypes = {
  eta: PropTypes.string.isRequired,
};

export default CSSModules(DroneLocationsETA, styles);
