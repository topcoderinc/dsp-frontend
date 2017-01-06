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
    {
      props.serviceType === 'Delivery' ?
        (<MapLegends distance={props.distance} />) : null
    }
  </div>
);

ProviderMap.propTypes = {
  distance: PropTypes.string,
  serviceType: PropTypes.string,
};

export default CSSModules(ProviderMap, styles);
