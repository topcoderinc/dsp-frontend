import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './DroneLocationsETA.scss';

const pad = (num) => {
  const s = `0${num}`;
  return s.substr(s.length - 2);
};

export const DroneLocationsETA = ({eta}) => (
  <div styleName="drone-locations-eta">
   ETA: <span styleName="value">{pad(Math.floor(eta / 3600))} : {pad(Math.floor((eta % 3600) / 60))} : {pad(eta % 60)}</span>
  </div>
);

DroneLocationsETA.propTypes = {
  eta: PropTypes.number.isRequired,
};

export default CSSModules(DroneLocationsETA, styles);
