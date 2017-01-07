import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import LastCompletedMissionsItem from '../LastCompletedMissionsItem';
import styles from './LastCompletedMissions.scss';

/*
* LastCompletedMissions
*/

export const LastCompletedMissions = ({lastMissions}) => (
  <div styleName="last-completed-missions">
    <h4 styleName="title">Last Completed Missions</h4>
    <div styleName="completed-mission-conatiner">
      {lastMissions.length ?
        (
          lastMissions.map((lastMission) => <LastCompletedMissionsItem key={lastMission.id} lastMission={lastMission} />)
        ) : (
          <span styleName="no-completed-missions">No completed missions yet</span>
        )
      }
    </div>
  </div>
);

LastCompletedMissions.propTypes = {
  lastMissions: PropTypes.array.isRequired,
};

export default CSSModules(LastCompletedMissions, styles);
