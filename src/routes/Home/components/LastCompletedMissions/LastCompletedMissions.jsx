import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './LastCompletedMissions.scss';
import LastCompletedMissionsItem from '../LastCompletedMissionsItem';
import HomeSectionHeader from '../HomeSectionHeader';

export const LastCompletedMissions = ({lastCompletedMissionsData}) => (
  <div styleName="last-completed-missions">
    <HomeSectionHeader
      title={'Last Completed Missions'}
      seeAll={'See All Completed Missions'}
    />

    <div styleName="last-completed-missions-items">
      <div styleName="completed-mission-conatiner">
        {lastCompletedMissionsData.map((lastCompletedMissionItemData, index) =>
          <LastCompletedMissionsItem key={index} lastCompletedMissionItemData={lastCompletedMissionItemData} />
				)}
      </div>
    </div>
  </div>
);

LastCompletedMissions.propTypes = {
  lastCompletedMissionsData: PropTypes.array.isRequired,
};

export default CSSModules(LastCompletedMissions, styles);
