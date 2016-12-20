import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './DroneInfoSpecification.scss';

const getImage = (name) => `${window.location.origin}/img/drones/${name}`;

/*
* DroneDetailsTabs
*/
export const DroneInfoSpecification = ({}) => (
  <div styleName="drone-info-spec ">
    <div styleName="left-col">
      <img src={getImage('drone-spec.png')} alt="drone picture" />
      <a href="javascript:;"><i />Download Drone Full Specifications (PDF)</a>
    </div>
    <div styleName="right-col">
      <div styleName="drone-spec">
        <h5>Drone Maniac Specifications</h5>
        <div styleName="spec-list-container">
          <div styleName="spec-list-left">
            <ul>
              <li>Rate of climb: 7.0 m/s</li>
              <li>Operating speed: 8.0 m/s</li>
              <li>Maximum thrust: 15.5 N</li>
              <li>Weight: ca. 800 g (depending on configuration)</li>
              <li>Recommended load: 150 g</li>
              <li>Maximum load: 250 g</li>
              <li>Maximum take-off weight (MTOW): 1,100 g</li>
            </ul>
          </div>
          {/* spec-list-left end */}
          <div styleName="spec-list-right">
            <ul>
              <li>Dimensions: 540 mm</li>
              <li>Battery: 14.8 V, 4S LiPo, 2300 mAh</li>
              <li>Flat core motors: yes</li>
              <li>CFD optimised propeller: yes</li>
              <li>Closed carbon housing: yes</li>
              <li>IP43 protection: yes</li>
            </ul>
          </div>
          {/* spec-list-right end */}
        </div>
      </div>
      {/* drone-spec end */}
      <div styleName="drone-spec">
        <h5>Drone Benefit</h5>
        <div styleName="spec-list-container">
          <div styleName="spec-list-left">
            <ul>
              <li>Up to 30 minutes flying time</li>
              <li>Rain-resistant, dust-resistant </li>
              <li>Extremely resistant to cold</li>
              <li>Extremely resistant to heat</li>
              <li>Flat core motors</li>
              <li>CFD-optimised propeller</li>
              <li>Closed carbon housing</li>
            </ul>
          </div>
          {/* spec-list-left end */}
          <div styleName="spec-list-right">
            <ul>
              <li>Less time needed to train crews</li>
              <li>Low maintenance costs</li>
              <li>Low service costs</li>
              <li>Lower costs compared to helicopters</li>
              <li>Low noise electric motor</li>
              <li>Lower air turbulence</li>
            </ul>
          </div>
          {/* spec-list-right end */}
        </div>
      </div>
      {/* drone-spec end */}
    </div>
  </div>
);

DroneInfoSpecification.propTypes = {
};

export default CSSModules(DroneInfoSpecification, styles);
