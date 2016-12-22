import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './DroneDetailBanner.scss';

const getImage = (name) => `${window.location.origin}/img/drones/${name}`;

/*
* DroneDetailBanner
*/
export const DroneDetailBanner = ({}) => (
  <div styleName="drone-detail-banner">
    <ul>
      <li>
        <div styleName="drone-name-rate">
          <img src={getImage('icon-drone.png')} alt="drone icon" className="icon-drone" />
          <div styleName="drone-name">
            <h4>Drone Maniac</h4>
            <div styleName="rating" />
          </div>
          <div styleName="badge" />
        </div>
      </li>
      <li>
        <div styleName="drone-info">
          <p styleName="label">Available Drones</p>
          <p className="value">15/20</p>
        </div>
      </li>
      <li>
        <div styleName="drone-info">
          <p styleName="label">Max Insurance Coverage</p>
          <p className="value">$200,000.00</p>
        </div>
      </li>
      <li>
        <div styleName="drone-info">
          <p styleName="label">Average Hourly Rate</p>
          <p className="value">15/20</p>
        </div>
      </li>
      <li>
        <div styleName="drone-info">
          <p styleName="label">Total Completed Jobs</p>
          <p className="value">164</p>
        </div>
      </li>
    </ul>
  </div>
);

DroneDetailBanner.propTypes = {
};

export default CSSModules(DroneDetailBanner, styles);
