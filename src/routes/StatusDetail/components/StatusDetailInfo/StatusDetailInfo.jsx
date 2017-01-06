import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import dateFormat from 'dateformat';
import TimeAgo from 'react-timeago';
import styles from './StatusDetailInfo.scss';

export const StatusDetailInfo = ({launchedAt, completedAt, speed, distance, driver}) => (
  <div styleName="status-detail-info">
    <table styleName="table">
      <thead>
        <tr>
          <th styleName="th">Time of Launch:</th>
          <th styleName="th">Time Mission Completed:</th>
          <th styleName="th">Speed:</th>
          <th styleName="th">Distance:</th>
          <th styleName="th">Drone Driver:</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td styleName="td">
            {launchedAt ? (
              <span>
                {dateFormat(launchedAt, 'ddd, hh:MM TT')}
                {' '}
                (<TimeAgo date={launchedAt} />)
              </span>
            ) : (
              '-'
            )}
          </td>
          <td styleName="td">
            {completedAt ? (
              <span>
                {dateFormat(completedAt, 'ddd, hh:MM TT')}
                {' '}
                (<TimeAgo date={completedAt} />)
              </span>
            ) : (
              '-'
            )}
          </td>
          <td styleName="td">{speed ? `${speed} mph` : 'N/A'}</td>
          <td styleName="td">{distance ? `${distance} km` : 'N/A'}</td>
          <td styleName="td">{driver || 'N/A'}</td>
        </tr>
      </tbody>
    </table>
  </div>
);

StatusDetailInfo.propTypes = {
  launchedAt: PropTypes.string,
  completedAt: PropTypes.string,
  speed: PropTypes.number,
  distance: PropTypes.number,
  driver: PropTypes.string,
};

export default CSSModules(StatusDetailInfo, styles);
