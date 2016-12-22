import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './LastCompletedMissionsItem.scss';

const getImage = (name) => `${window.location.origin}/img/route/${name}`;

/*
* LastCompletedMissionsItem
*/

export const LastCompletedMissionsItem = ({LastCompletedMissionItemData}) => (
  <div styleName="last-completed-mission-item">
    <img src={getImage(LastCompletedMissionItemData.routeImg)} alt="route thumb" />
    <h4><a href="javascript:;">{LastCompletedMissionItemData.missionTitle}</a></h4>
    <div styleName="icon-rating" />
    <div styleName="row">
      <div styleName="left">Job ID</div>
      <div styleName="right" className={styles.id}><span>:</span><a href="javascript:;">{LastCompletedMissionItemData.id}</a></div>
    </div>
    <div styleName="row">
      <div styleName="left">Service Type</div>
      <div styleName="right"><span>:</span> {LastCompletedMissionItemData.type}</div>
    </div>
    <div styleName="row">
      <div styleName="left">Delivery Date</div>
      <div styleName="right"><span>:</span> {LastCompletedMissionItemData.date}</div>
    </div>
    <div styleName="row">
      <div styleName="left">Delivery Location</div>
      <div styleName="right"><span>:</span> {LastCompletedMissionItemData.location}</div>
    </div>
  </div>
);

LastCompletedMissionsItem.propTypes = {
  LastCompletedMissionItemData: PropTypes.object.isRequired,
};

export default CSSModules(LastCompletedMissionsItem, styles);
