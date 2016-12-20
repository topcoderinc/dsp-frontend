import React from 'react';
import CSSModules from 'react-css-modules';
import CountdownTimer from 'components/CountdownTimer';
import styles from './MapLegends.scss';


/*
* MapLegends
*/

export const MapLegends = () => (
  <div>
    <div styleName="map-legends">
      <div styleName="location">
        <i styleName="icon-drone" />
        Drone <br />
        Provider
      </div>
      {/* location end */}
      <div styleName="location">
        <i styleName="icon-target" />
        Target
      </div>
      {/* location end */}
      <div styleName="location">
        <i styleName="icon-start" />
        Your <br />
        Location
      </div>
      {/* location end */}
    </div>

    <div styleName="drone-eta">
      ETA: <span><CountdownTimer initialTimeRemaining={2240000} /></span>

    </div>
    {/* drone-eta end */}
  </div>
);

MapLegends.propTypes = {
};

export default CSSModules(MapLegends, styles);
