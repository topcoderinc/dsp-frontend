import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import MissionPlanner from 'components/MissionPlanner';
import MapLegends from 'components/MapLegends';
import styles from './ProviderMap.scss';

export const ProviderMap = ({ providerCoords, distance }) => (
  <div styleName="provider-map">
    <MissionPlanner
      {...{
        center: providerCoords,
        isEditable: true,
        providerCoords,
      }}
    />
    <div styleName="map-legends"><MapLegends distance={distance} /></div>
  </div>
);

ProviderMap.propTypes = {
  providerCoords: PropTypes.object.isRequired,
  distance: PropTypes.string.isRequired,
};


export default CSSModules(ProviderMap, styles);
