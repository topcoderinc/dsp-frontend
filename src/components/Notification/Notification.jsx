import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import enhanceWithClickOutside from 'react-click-outside';
import styles from './Notification.scss';
import NotificationRow from './NotificationRow';


class Notification extends Component {
  handleClickOutside() {
    this.props.handleNotification(!this.props.toggleNotif);
  }
  render() {
    const {toggleNotif, handleNotification, notifications} = this.props;
    return (
      <div styleName="notifications">
        <div styleName="notifications-head">
          <p>You have {notifications.length} notifications:</p>
        </div>
        <div styleName="notifications-rows">
          {
           notifications.map((notification, i) => (
             <div key={i} className={styles.notifiRow}><NotificationRow notification={notification} /></div>
			      ))
          }
        </div>
        <div styleName="notifications-footer">
          <a href="javascript:;">See All Notifications</a>
        </div>
      </div>
    );
  }
}

Notification.defaultProps = {
  notifications: PropTypes.array.isRequired,
};

export default enhanceWithClickOutside(CSSModules(Notification, styles));
