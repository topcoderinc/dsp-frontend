import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './NotificationRow.scss';

export const NotificationRow = ({notification}) => (
  <div>
    <div styleName="notification-row">
      <div styleName="notification-icon">
        {
          notification.status === 'completed' && <i styleName="icon-notif-green" />
        }
        {
          notification.status === 'started' && <i styleName="icon-notif-grey" />
        }
      </div>
      <div styleName="notification-detail">
        <p>
          <a href="javascript:;">{notification.droneName} </a> has {notification.status} your {'"Deliver My Package"'} request.
        </p>
        <div styleName="time">
          {notification.time}
        </div>
      </div>
    </div>
  </div>
);

NotificationRow.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default CSSModules(NotificationRow, styles, {allowMultiple: true});
