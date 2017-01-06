import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import MapLegends from 'components/MapLegends';
import DroneLocationsETA from '../DroneLocationsETA';
import GoogleMapRoute from './GoogleMapRoute';
import styles from './StatusDetailMapRoute.scss';

export const StatusDetailMapRoute = ({distance, eta, showMapLegends,
      endLocation, startLocation, zones, status}) => (
        <div styleName="status-detail-map-route">
          <GoogleMapRoute
            containerElement={
              <div style={{height: '100%'}} />
          }
            mapElement={
              <div style={{height: '100%'}} />
          }
            startLocation={startLocation}
            endLocation={endLocation}
            zones={zones}
          />
          {showMapLegends && !zones && <div styleName="map-legends"><MapLegends distance={_.isNil(distance) ? '' : `${distance} km`} /></div>}
          {status !== 'completed' && eta && <div styleName="drone-eta"><DroneLocationsETA eta={eta} /></div>}
        </div>
    );

StatusDetailMapRoute.propTypes = {
  distance: PropTypes.number,
  eta: PropTypes.number,
  showMapLegends: PropTypes.bool,
  startLocation: PropTypes.object,
  endLocation: PropTypes.object,
  zones: PropTypes.array,
  status: PropTypes.string,
};

StatusDetailMapRoute.defaultProps = {
  showMapLegends: false,
};

export default CSSModules(StatusDetailMapRoute, styles);
