import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './MapLegends.scss';


/*
* MapLegends
*/

export const MapLegends = ({distance}) => (
  <div styleName="map-legends">
    <div styleName="location">
      <i styleName="icon-drone" />
      Drone <br />
      Provider
    </div>
    <div styleName="location">
      <i styleName="icon-target" />
      Target
    </div>
    <div styleName="location">
      <i styleName="icon-start" />
      Your <br />
      Location
    </div>
    <strong styleName="distance">
      Distance: {distance}
    </strong>
  </div>
);

MapLegends.propTypes = {
  distance: PropTypes.string.isRequired,
};

export default CSSModules(MapLegends, styles);
