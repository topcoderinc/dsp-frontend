import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './MissionProgressDroneDetails.scss';


/*
* MissionProgressDroneDetails
*/

export const MissionProgressDroneDetails = ({droneDetails}) => (
  <div styleName="mission-progress-drone-details">
    <div styleName="title">Drone/Telematry Details</div>
    <div styleName="drone-details">
      <div styleName="drone-pic" />
      <div styleName="drone-info">
        <div styleName="data-row">
          <div styleName="label">Drone serial number:</div>
          <div styleName="value"><a href="javascript:;">{droneDetails.droneSerialNum}</a></div>
        </div>
        <div styleName="data-row">
          <div styleName="label">Drone name:</div>
          <div styleName="value"><a href="javascript:;">{droneDetails.droneName}</a></div>
        </div>
        <div styleName="data-row">
          <div styleName="label">Drone type:</div>
          <div styleName="value">{droneDetails.droneType}</div>
        </div>
        <div styleName="data-row">
          <div styleName="label">Time of launch:</div>
          <div styleName="value">{droneDetails.timeOfLanunch}</div>
        </div>
        <div styleName="data-row">
          <div styleName="label">Estimated arrival time:</div>
          <div styleName="value">{droneDetails.arrivalTime}</div>
        </div>
        <div styleName="data-row">
          <div styleName="label">Average speed:</div>
          <div styleName="value">{droneDetails.avarageSpeed}</div>
        </div>
      </div>
      {/* drone-info end */}
    </div>
    {/* drone-details end */}
  </div>
);

MissionProgressDroneDetails.propTypes = {
  droneDetails: PropTypes.object.isRequired,
};

export default CSSModules(MissionProgressDroneDetails, styles);
