import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './MissProgDroneEstimateRow.scss';
import MissionProgressDroneDetails from '../MissionProgressDroneDetails';
import MissionProgressDroneEstimation from '../MissionProgressDroneEstimation';


/*
* MissProgDroneEstimateRow
*/

export const MissProgDroneEstimateRow = ({droneDetails, estimations, statusName}) => (
  <div styleName="mission-prog-drone-estimate">
    <div styleName="left-col">
      <MissionProgressDroneDetails droneDetails={droneDetails} />
    </div>
    <div styleName="right-col">
      <MissionProgressDroneEstimation estimations={estimations} statusName={statusName} />
    </div>
  </div>
);

MissProgDroneEstimateRow.propTypes = {
  droneDetails: PropTypes.object.isRequired,
  estimations: PropTypes.object.isRequired,
  statusName: PropTypes.string.isRequired,
};

export default CSSModules(MissProgDroneEstimateRow, styles);
