import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Button from 'components/Button';
import styles from './MissionProgressDroneEstimation.scss';


/*
* MissionProgressDroneEstimation
*/

export const MissionProgressDroneEstimation = ({estimations, statusName}) => (
  <div styleName="mission-progress-drone-estimation">
    <div styleName="title-row">
      {statusName === 'Completed' ? <div styleName="title">Mission Result Data</div> : <div styleName="title">Estimation</div>}

      <div styleName="edit-btn">
        {statusName === 'Completed' ? <Button color="blue" className={styles.editBtn}>Update</Button> : <Button color="blue" className={styles.editBtn}>Edit</Button>}
      </div>
    </div>
    {/* title-row end */}
    <div styleName="estimation-info">
      <div styleName="data-row">
        <div styleName="label">Time of launch:</div>
        <div styleName="value">{estimations.timeOfLanunch}</div>
      </div>
      <div styleName="data-row">
        <div styleName="label">Speed:</div>
        <div styleName="value">{estimations.speed}</div>
      </div>
      <div styleName="data-row">
        <div styleName="label">Distance:</div>
        <div styleName="value">{estimations.distance}</div>
      </div>
      <div styleName="data-row">
        <div styleName="label">Time:</div>
        <div styleName="value">{estimations.time}</div>
      </div>
    </div>
    {/* estimation-info end */}
  </div>
);

MissionProgressDroneEstimation.propTypes = {
  estimations: PropTypes.object.isRequired,
  statusName: PropTypes.string.isRequired,
};

export default CSSModules(MissionProgressDroneEstimation, styles);
