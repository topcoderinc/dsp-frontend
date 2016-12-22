import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './DroneInfoSpecification.scss';

const getImage = (name) => `${window.location.origin}/img/myDrones/${name}`;

/*
* DroneDetailsTabs
*/

export const DroneInfoSpecification = ({droneSpecifications, droneBenefits}) => (
  <div styleName="drone-info-spec ">
    <div styleName="left-col">
      <img src={getImage('drone-spec.png')} alt="drone thumb" />
      <a href="javascript:;"><i />Download Drone Full Specifications (PDF)</a>
    </div>
    <div styleName="right-col">
      <div styleName="drone-spec">
        <h5>Drone Maniac Specifications</h5>
        <div styleName="spec-list-container">
          <div styleName="spec-list-left">
            <ul>
              <li>Rate of climb: {droneSpecifications.RateOfClimb}</li>
              <li>Operating speed: {droneSpecifications.OperatingSpeed}</li>
              <li>Maximum thrust: {droneSpecifications.MaximumThrust}</li>
              <li>Weight: {droneSpecifications.Weight}</li>
              <li>Recommended load: {droneSpecifications.RecommendedLoad}</li>
              <li>Maximum load: {droneSpecifications.MaximumLoad}</li>
              <li>Maximum take-off weight (MTOW): {droneSpecifications.MaximumLakeOffWeight}</li>
            </ul>
          </div>
          {/* spec-list-left end */}
          <div styleName="spec-list-right">
            <ul>
              <li>Dimensions: {droneSpecifications.Dimensions} (from rotor hub to rotor hub)</li>
              <li>Battery: {droneSpecifications.Battery}</li>
              <li>Flat core motors: {droneSpecifications.FlatCoreMotors}</li>
              <li>CFD optimised propeller: {droneSpecifications.CFDOptimisedPropeller}</li>
              <li>Closed carbon housing: {droneSpecifications.ClosedCarbonHousing}</li>
              <li>IP43 protection: {droneSpecifications.IP43Protection}</li>
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
              {droneBenefits.map((benefit, index) =>
                index < 6 && <li key={index}>{benefit.toString()}</li>

              )}

            </ul>
          </div>
          {/* spec-list-left end */}
          <div styleName="spec-list-right">
            <ul>
              {droneBenefits.map((benefit, index) =>
                index > 5 && <li key={index}>{benefit.toString()}</li>

              )}
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
  droneSpecifications: PropTypes.object.isRequired,
  droneBenefits: PropTypes.array.isRequired,

};

export default CSSModules(DroneInfoSpecification, styles);
