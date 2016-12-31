import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {Link} from 'react-router';
import LogInModalContainer from 'routes/Home/containers/LoginModalContainer';
import SignupModalContainer from 'routes/Home/containers/SignupModalContainer';
import SearchInput from '../SearchInput';
import Dropdown from '../Dropdown';
import Notification from '../Notification';
import styles from './Header.scss';

export const Header = ({
  location, selectedCategory, categories, user, notifications,
  routes, handleNotification, doLogout, toggleNotif, loggedUser,
}) => (

  <nav styleName="header">
    <ul>
      <li styleName="branding">
        DRONE MARKET
      </li>
      {
        (() => {
            if (user.role=="consumer"){
              return (
                <li styleName="pages">
                  <ul>
                    <li>
                      <Link to="/home" activeClassName="active">Home</Link>
                    </li>
                    <li>
                      <Link to="/my-request-status" activeClassName="active">My Requests</Link>
                    </li>
                    <li>
                      <Link to="/browse-provider" activeClassName="active">Browse Services</Link>
                    </li>
                    <li><Link to="javascript:;" activeClassName="active">Analytics</Link></li>
                    <li><Link to="/drones-map" activeClassName="active">Drone Traffic</Link></li>
                    <li><Link to="/mission-planner" activeClassName="active">MissionPlanner</Link></li>
                  </ul>
                </li>
              );
            } else if (user.role=="provider"){
              return (
                <li styleName="pages">
                  <ul>
                    <li>
                      <Link to="/dashboard" activeClassName="active">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/my-request" activeClassName="active">Requests</Link>
                    </li>
                    <li>
                      <Link to="/my-drone" activeClassName="active">My Drones</Link>
                    </li>
                    <li>
                      <Link to="/my-services" activeClassName="active">My Services</Link>
                    </li>
                    <li><Link to="javascript:;" activeClassName="active">Analytics</Link></li>
                    <li><Link to="/drones-map" activeClassName="active">Drone Traffic</Link></li>
                    <li><Link to="/mission-planner" activeClassName="active">MissionPlanner</Link></li>
                  </ul>
                </li>
              );
            }
        })()
      }
      {
        (() => {
          if (!loggedUser) {
            return (
            [
              (<li key="location" styleName="location">
                <i />
                {location}
              </li>),
              (<li key="search" styleName="search">
                <SearchInput placeholder="Type your search here..." />
              </li>),
              (<li key="category">
                <Dropdown title={selectedCategory}>
                  <ul>
                    {categories.map((item, i) => <li key={i}><a href="javascript:">{item.name}</a></li>)}
                  </ul>
                </Dropdown>
              </li>),
              (<li key="login" styleName="login">
                <LogInModalContainer />
              </li>),
              (<li key="signup" styleName="login">
                <SignupModalContainer />
              </li>),
            ]
            );
          }
          return (
          [
              (<li key="notification" styleName="notifications" onClick={() => handleNotification(!toggleNotif)}>
                {notifications.length > 0 && <span styleName="counter">{notifications.length}</span>}
                {toggleNotif && <Notification
                  notifications={notifications} toggleNotif={toggleNotif}
                  handleNotification={handleNotification}
                />}
              </li>),
              (<li key="welcome" styleName="user">
                <Dropdown title={<span>Welcome,<br />{user.name}</span>}>
                  <ul>
                    <li>
                      <a href="javascript:">Profile</a>
                    </li>
                    <li>
                      <a href="javascript:" onClick={doLogout()}>Logout</a>
                    </li>
                  </ul>
                </Dropdown>
              </li>),
          ]
          );
        })()
      }

    </ul>
  </nav>
);

Header.propTypes = {
  routes: PropTypes.any.isRequired,
  location: PropTypes.string.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  notifications: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  handleNotification: PropTypes.func,
  doLogout: PropTypes.func.isRequired,
  toggleNotif: PropTypes.bool,
  loggedUser: PropTypes.bool,
};

export default CSSModules(Header, styles);
