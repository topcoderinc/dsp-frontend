import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import dateFormat from 'dateformat';
import MissionPlanner from 'components/MissionPlanner';
import Rate from 'components/Rate';
import styles from './LastCompletedMissionsItem.scss';

const missionItemBlank = {
  id: 0,
  coordinate: [0, 0, 0],
  param1: 0,
  param2: 0,
  param3: 0,
  param4: 0,
  command: '',
  frame: '',
};

/*
* LastCompletedMissionsItem
*/

export const LastCompletedMissionsItem = ({lastMission}) => {
  const plannedHomePosition = {
    ...missionItemBlank,
    coordinate: [
      lastMission.destinationPoint.coordinates[0],
      lastMission.destinationPoint.coordinates[1],
      0,
    ],
  };

  const missionItems = [{
    ...missionItemBlank,
    id: 1,
    coordinate: [
      lastMission.startingPoint.coordinates[0],
      lastMission.startingPoint.coordinates[1],
      0,
    ],
  }];

  return (
    <div styleName="last-completed-mission-item">
      <div styleName="mission-map">
        <MissionPlanner mission={{missionItems, plannedHomePosition}} isSmall />
      </div>
      <h4><a href="javascript:;">{lastMission.missionName}</a></h4>
      <div styleName="rating"><Rate value={lastMission.rating} /></div>
      <div styleName="row">
        <div styleName="left">Job ID</div>
        <div styleName="right" className={styles.id}><span>:</span><a href="javascript:;">{lastMission.id}</a></div>
      </div>
      <div styleName="row">
        <div styleName="left">Service Type</div>
        <div styleName="right"><span>:</span> {lastMission.serviceType}</div>
      </div>
      <div styleName="row">
        <div styleName="left">Delivery Date</div>
        <div styleName="right"><span>:</span> {dateFormat(lastMission.completedAt, 'mm/dd/yyyy hh:MM TT')}</div>
      </div>
      <div styleName="row">
        <div styleName="left">Delivery Location</div>
        <div styleName="right"><span>:</span> {`${lastMission.destinationPoint.line1} ${lastMission.destinationPoint.city}`}</div>
      </div>
    </div>
  );
};

LastCompletedMissionsItem.propTypes = {
  lastMission: PropTypes.object.isRequired,
};

export default CSSModules(LastCompletedMissionsItem, styles);
