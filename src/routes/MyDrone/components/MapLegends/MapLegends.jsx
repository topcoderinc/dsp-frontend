import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './MapLegends.scss';


/*
* MapLegends
*/

export const MapLegends = () => (
  <div styleName="map-legends">
    <div styleName="location">
      <i styleName="icon-standby-drone-sm" />
      Ready
    </div>
    {/* location end */}
    <div styleName="location">
      <i styleName="icon-booked-drone-sm" />
      In Motion
    </div>
    {/* location end */}
    <div styleName="location">
      <i styleName="icon-error-drone-sm" />
      Busy
    </div>
    {/* location end */}
  </div>
);

MapLegends.propTypes = {
};

export default CSSModules(MapLegends, styles);
