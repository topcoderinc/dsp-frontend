import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import LastCompletedMissionsItem from '../LastCompletedMissionsItem';
import styles from './LastCompletedMissions.scss';

/*
* LastCompletedMissions
*/

export const LastCompletedMissions = ({LastCompletedMissionsData}) => (
  <div styleName="last-completed-missions">
    <h4 styleName="title">Last Completed Missions</h4>
    <div styleName="completed-mission-conatiner">
      {LastCompletedMissionsData.map((LastCompletedMissionItemData, index) =>
        <LastCompletedMissionsItem key={index} LastCompletedMissionItemData={LastCompletedMissionItemData} />)}
    </div>
  </div>
);

LastCompletedMissions.propTypes = {
  LastCompletedMissionsData: PropTypes.array.isRequired,
};

export default CSSModules(LastCompletedMissions, styles);
