import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './NotificationBox.scss';

const _renderLatestNotifications = (message, i) => (
  <li key={i} styleName={message.type}>
    {message.summary}
    <a styleName="message-link" href={message.link}>Read all &gt;</a>
    <span styleName="message-time">{message.time}</span>
  </li>
);

const _renderRecentExecutedRequests = (message, i) => (
  <li key={i} styleName="drone">
    {`Drone ${message.drone} was allocated for request `}
    <a href={`#${message.requestNumber}`}>{message.requestNumber}</a>
    <span styleName="message-time">{message.time}</span>
  </li>
);

export const NotificationBox = ({ notificationType, messages }) => (
  <div styleName="notification-box">
    <h3>{notificationType}</h3>

    <ul>
      {(() => {
        if (notificationType === 'Latest Notifications') {
          return messages.slice(0, 3).map(_renderLatestNotifications);
        }
        return messages.slice(0, 3).map(_renderRecentExecutedRequests);
      })()}
    </ul>
  </div>
);

NotificationBox.propTypes = {
  notificationType: PropTypes.oneOf(['Latest Notifications', 'Recent Executed Requests']),
  messages: PropTypes.array,
};

export default CSSModules(NotificationBox, styles);
