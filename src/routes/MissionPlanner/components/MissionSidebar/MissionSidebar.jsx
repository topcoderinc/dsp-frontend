import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import MissionSidebarItem from '../MissionSidebarItem';
import styles from './MissionSidebar.scss';

export const MissionSidebar = ({missionItems, onUpdate, onDelete}) => (
  <div styleName="mission-sidebar">
    {missionItems.length ? (
        missionItems.map((missionItem) => (
          <MissionSidebarItem
            key={missionItem.uid}
            uid={missionItem.uid}
            {..._.omit(missionItem, 'coordinate')}
            lat={missionItem.coordinate[0]}
            lng={missionItem.coordinate[1]}
            alt={missionItem.coordinate[2]}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      ) : (
        <div styleName="note">Please, add some points</div>
      )}
  </div>
  );

MissionSidebar.propTypes = {
  missionItems: PropTypes.array.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CSSModules(MissionSidebar, styles);
