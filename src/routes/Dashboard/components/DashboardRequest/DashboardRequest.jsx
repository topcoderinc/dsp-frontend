import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import Pagination from 'components/Pagination';
import Tabs from 'components/Tabs';
import StatusIcon from 'components/StatusIcon';
import styles from './DashboardRequest.scss';

const tabList = [{
  name: 'New Request',
}, {
  name: 'Today\'s Mission',
}];

export const DashboardRequest = ({activeTab, dashboardRequests}) => (
  <div styleName="dashboard-request">
    <div styleName="tab-container">
      <Tabs activeTab={activeTab || 0} tabList={tabList} />
      <div styleName="date-container">
        {moment().format('ddd, MMM DD, YYYY')}
      </div>
    </div>
    <div styleName="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Delivery Date</th>
            <th>Delivery Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dashboardRequests.map((dashboardRequest, i) => (
            <tr key={i}>
              <td><a href="#">{dashboardRequest.id}</a></td>
              <td>{moment(dashboardRequest).format('MMM, DD YYYY - hh:mm A')}</td>
              <td>{dashboardRequest.deliveryLocation}</td>
              <td>
                <StatusIcon iconType={dashboardRequest.status} />
              </td>
            </tr>
            ))
          }
        </tbody>
      </table>
    </div>
    <div styleName="pagination-container">
      <Pagination pages={4} activePageIndex={0} />
    </div>
  </div>
);

DashboardRequest.propTypes = {
  activeTab: PropTypes.number,
  dashboardRequests: PropTypes.array,
};

export default CSSModules(DashboardRequest, styles);
