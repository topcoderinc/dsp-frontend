import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './DroneInfoSpecification.scss';
import _ from 'lodash';

/**
 * Format boolean value
 * @param  {Boolean} value boolean to format
 * @return {String}        formatted value
 */
const formatBool = (value) => (
  value ? 'yes' : 'no'
);

/**
 * Format a number
 * @param  {Mixed}  value number to format
 * @return {String}       formatted value
 */
const formatNumber = (value) => (
  _.isNumber(value) ? value.toFixed(2) : value
);

/**
 * Checks if value is empty, so we don't show it
 * @param  {Mixed}   value source to check
 * @return {Boolean}       true if not empty
 */
const notEmpty = (value) => (
  !_.isNil(value) && value !== ''
);

/*
* DroneDetailsTabs
*/

export const DroneInfoSpecification = ({drone}) => (
  <div styleName="drone-info-spec ">
    {(drone.specificationImageUrl || drone.specificationPDFUrl) && <div styleName="left-col">
      {drone.specificationImageUrl && <img src={drone.specificationImageUrl} alt="drone specification preview" />}
      {drone.specificationPDFUrl && <a href={drone.specificationPDFUrl} target="_blank" rel="noopener noreferrer"><i />Download Drone Full Specifications (PDF)</a>}
    </div>}
    <div styleName="right-col">
      <div styleName="drone-spec">
        <h5>Drone Maniac Specifications</h5>
        {drone.specificationContent && <div styleName="spec-text">{drone.specificationContent}</div>}
        <div styleName="spec-list-container">
          <div styleName="spec-list-left">
            <ul>
              <li>Max. flight time: {notEmpty(drone.maxFlightTime) ? <span>{formatNumber(drone.maxFlightTime)} minutes</span> : <span>-</span>}</li>
              <li>Min. speed: {notEmpty(drone.minSpeed) ? <span>{formatNumber(drone.minSpeed)} mph</span> : <span>-</span>}</li>
              <li>Max. speed: {notEmpty(drone.maxSpeed) ? <span>{formatNumber(drone.maxSpeed)} mph</span> : <span>-</span>}</li>
              <li>Max. cargo weight: {notEmpty(drone.maxCargoWeight) ? <span>{formatNumber(drone.maxCargoWeight)} lbs</span> : <span>-</span>}</li>
              <li>Max altitude: {notEmpty(drone.maxAltitude) ? <span>{formatNumber(drone.maxAltitude)} miles</span> : <span>-</span>}</li>
              <li>Camera resolution: {notEmpty(drone.cameraResolution) ? <span>{formatNumber(drone.cameraResolution)} megapixels</span> : <span>-</span>}</li>
              <li>Video resolution: {notEmpty(drone.videoResolution) ? <span>{formatNumber(drone.videoResolution)} p</span> : <span>-</span>}</li>
              <li>Number of rotors: {notEmpty(drone.numberOfRotors) ? <span>{drone.numberOfRotors}</span> : <span>-</span>}</li>
              <li>Engine type: {notEmpty(drone.engineType) ? <span>{drone.engineType}</span> : <span>-</span>}</li>
            </ul>
          </div>
          {/* spec-list-left end */}
          <div styleName="spec-list-right">
            <ul>
              <li>WiFi: {formatBool(drone.hasWiFi)}</li>
              <li>Bluetooth: {formatBool(drone.hasBluetooth)}</li>
              <li>Accelerometer: {formatBool(drone.hasAccelerometer)}</li>
              <li>Gyroscope: {formatBool(drone.hasGyroscope)}</li>
              <li>Radar: {formatBool(drone.hasRadar)}</li>
              <li>GPS: {formatBool(drone.hasGPS)}</li>
              <li>Obstacle Sensors: {formatBool(drone.hasObstacleSensors)}</li>
              <li>Ultra Sonic Altimeter: {formatBool(drone.hasUltraSonicAltimeter)}</li>
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
  drone: PropTypes.object.isRequired,
};

export default CSSModules(DroneInfoSpecification, styles);
