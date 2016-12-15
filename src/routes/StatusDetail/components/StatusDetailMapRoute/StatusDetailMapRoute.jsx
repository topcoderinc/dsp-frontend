import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import MissionPlanner from 'components/MissionPlanner';
import MapLegends from 'components/MapLegends';
import DroneLocationsETA from '../DroneLocationsETA';
import styles from './StatusDetailMapRoute.scss';

export const StatusDetailMapRoute = ({ distance, eta, showMapLegends, providerCoords, droneCoords, mission, isSmall }) => (
  <div styleName="status-detail-map-route">
    <MissionPlanner
      {...{
        providerCoords,
        droneCoords,
        mission,
        isSmall,
      }}
    />
    {showMapLegends && <div styleName="map-legends"><MapLegends distance={distance} /></div>}
    {eta && <div styleName="drone-eta"><DroneLocationsETA eta={eta} /></div>}
  </div>
);

StatusDetailMapRoute.propTypes = {
  distance: PropTypes.string,
  eta: PropTypes.string,
  showMapLegends: PropTypes.bool,
  providerCoords: PropTypes.object,
  droneCoords: PropTypes.object,
  mission: PropTypes.object,
  isSmall: PropTypes.bool,
};

StatusDetailMapRoute.defaultProps = {
  showMapLegends: false,
  isSmall: false,
};

export default CSSModules(StatusDetailMapRoute, styles);
