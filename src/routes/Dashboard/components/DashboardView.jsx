import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './DashboardView.scss';
import DashboardStatus from '../components/DashboardStatus';
import DashboardRequest from '../components/DashboardRequest';
import NotificationBox from '../components/NotificationBox';

export const DashboardView = ({ latestNotifications, recentExecutedRequests, dashboardStatus, dashboardRequests }) => (
  <div styleName="dashboard-view">
    <h2>Dashboard</h2>
    <div>
      <DashboardStatus {...dashboardStatus} />
    </div>
    <div styleName="content">
      <div styleName="left-col">
        <DashboardRequest dashboardRequests={dashboardRequests} />
      </div>
      <div styleName="right-col">
        <NotificationBox notificationType="Latest Notifications" messages={latestNotifications} />
        <NotificationBox notificationType="Recent Executed Requests" messages={recentExecutedRequests} />
      </div>
    </div>
  </div>
);

DashboardView.propTypes = {
  latestNotifications: PropTypes.array.isRequired,
  recentExecutedRequests: PropTypes.array.isRequired,
  dashboardRequests: PropTypes.array.isRequired,
  dashboardStatus: PropTypes.object.isRequired,
};

export default CSSModules(DashboardView, styles);
