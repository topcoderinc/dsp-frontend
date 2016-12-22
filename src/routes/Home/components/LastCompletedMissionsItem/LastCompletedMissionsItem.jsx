import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './LastCompletedMissionsItem.scss';

const getImage = (name) => `${window.location.origin}/img/route/${name}`;

export const LastCompletedMissionsItem = ({lastCompletedMissionItemData}) => (
  <div styleName="last-completed-mission-item">
    <img src={getImage(lastCompletedMissionItemData.routeImg)} alt="route picture" />
    <h4>{lastCompletedMissionItemData.missionTitle}</h4>
    <div styleName="icon-rating" />
    <div styleName="row">
      <div styleName="left">Drone Provider</div>
      <div styleName="right"><span>:</span> {lastCompletedMissionItemData.droneProvider}</div>
    </div>
    <div styleName="row">
      <div styleName="left">Delivery Date</div>
      <div styleName="right"><span>:</span> {lastCompletedMissionItemData.date}</div>
    </div>
    <div styleName="row">
      <div styleName="left">Delivery Location</div>
      <div styleName="right"><span>:</span> {lastCompletedMissionItemData.location}</div>
    </div>
  </div>
);

LastCompletedMissionsItem.propTypes = {
  lastCompletedMissionItemData: PropTypes.object.isRequired,
};

export default CSSModules(LastCompletedMissionsItem, styles);
