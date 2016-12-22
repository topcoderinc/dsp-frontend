import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './DashboardStatus.scss';

export const DashboardStatus = ({pendingRequests, scheduledMissions, inProgressMissions, completedMissions, totalDrones}) => (
  <div styleName="dashboard-status-container">
    <div styleName="pending-requests">
      <div styleName="counter">{pendingRequests || 0}</div>
      <div styleName="label">New / Pending Requests</div>
    </div>
    <div styleName="scheduled-missions">
      <div styleName="counter">{scheduledMissions || 0}</div>
      <div styleName="label">Scheduled Missions</div>
    </div>
    <div styleName="in-progress-missions">
      <div styleName="counter">{inProgressMissions || 0}</div>
      <div styleName="label">Mission in Progress</div>
    </div>
    <div styleName="completed-missions">
      <div styleName="counter">{completedMissions || 0}</div>
      <div styleName="label">Completed Missions</div>
    </div>
    <div styleName="total-drones">
      <div styleName="counter">{totalDrones || 0}</div>
      <div styleName="label">Total Drones</div>
    </div>
  </div>
);

DashboardStatus.propTypes = {
  pendingRequests: PropTypes.number.isRequired,
  scheduledMissions: PropTypes.number.isRequired,
  inProgressMissions: PropTypes.number.isRequired,
  completedMissions: PropTypes.number.isRequired,
  totalDrones: PropTypes.number.isRequired,
};

export default CSSModules(DashboardStatus, styles);
