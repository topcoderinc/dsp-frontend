import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import MapLegends from '../MapLegends';
import styles from './ProviderMap.scss';
import ProviderGoogleMap from './ProviderGoogleMap';

const ProviderMap = (props) => (
  <div styleName="provider-map">
    <ProviderGoogleMap
      containerElement={
        <div style={{height: '100%'}} />
      }
      mapElement={
        <div style={{height: '100%'}} />
      }
      {...props}
    />
    <MapLegends distance={props.distance} />
  </div>
);

ProviderMap.propTypes = {
  distance: PropTypes.string.isRequired,
};

export default CSSModules(ProviderMap, styles);
