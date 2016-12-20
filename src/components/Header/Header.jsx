import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import LogInSignUpModalContainer from 'routes/Home/containers/LogInSignUpModalContainer';
import SearchInput from '../SearchInput';
import Dropdown from '../Dropdown';
import Notification from '../Notification';
import styles from './Header.scss';

export const Header = ({location, selectedCategory, categories, user, notifications,
  routes, handleNotification, toggleNotif, loggedUser}) => (

    <nav styleName="header">
      <ul>
        <li styleName="branding">
        DRONE MARKET
      </li>
        {
        (() => {
          const currentRoute = routes[routes.length - 1].name;
          if (currentRoute === 'ServiceRequest'
			  || currentRoute === 'Home'
              || currentRoute === 'MyRequestStatus'
              || currentRoute === 'StatusDetail') {
            return (
            [(<li key="location" styleName="location">
              <i />
              {location}
            </li>),
                (<li key="search" styleName="search">
                  <SearchInput placeholder="Type your search here..." />
                </li>),
            ]
            );
          }
          return (
            <li styleName="pages">
              <ul>
                <li className={currentRoute === 'Dashboard' ? 'active' : null}><Link to="/dashboard">Dashboard</Link></li>
                <li className={currentRoute === 'Requests' ? 'active' : null}><Link to="/my-request">Requests</Link></li>
                <li className={currentRoute === 'My Drones' ? 'active' : null}><Link to="/my-drone" activeClassName="active">My Drones</Link></li>
                <li className={currentRoute === 'My Services' ? 'active' : null}><Link to="/my-services" activeClassName="active">My Services</Link></li>
                <li><Link to="javascript:;" activeClassName="active">Analytics</Link></li>
                <li className={currentRoute === 'DroneMap' ? 'active' : null}><Link to="/drones-map">Drone Traffic</Link></li>
                <li className={currentRoute === 'MissionPlanner' ? 'active' : null}><Link to="/mission-planner">MissionPlanner</Link></li>
              </ul>
            </li>
          );
        })()
      }
        {
        (() => {
          const isLoggedIn = false;
          if (!loggedUser) {
            return (
            [
              (<li key="category">
                <Dropdown title={selectedCategory}>
                  <ul>
                    {categories.map((item, i) => <li key={i}><a href="javascript:">{item.name}</a></li>)}
                  </ul>
                </Dropdown>
              </li>),
              (<li key="login" styleName="login">
                <LogInSignUpModalContainer />
              </li>),
            ]
            );
          }
          return (
          [
              (<li key="notification" styleName="notifications" onClick={() => handleNotification(!toggleNotif)}>
                {notifications.length > 0 && <span styleName="counter">{notifications.length}</span>}
                {toggleNotif && <Notification notifications={notifications} toggleNotif={toggleNotif} handleNotification={handleNotification} />}
              </li>),
              (<li key="category">
                <Dropdown title={selectedCategory}>
                  <ul>
                    {categories.map((item, i) => <li key={i}><a href="javascript:">{item.name}</a></li>)}
                  </ul>
                </Dropdown>
              </li>),
              (<li key="welcome" styleName="user">
                <Dropdown title={<span>Welcome,<br />{user.name}e</span>}>
                  <ul>
                    <li>
                      <a href="javascript:">Profile</a>
                    </li>
                    <li>
                      <a href="javascript:">Logout</a>
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
  toggleNotif: PropTypes.bool,
  loggedUser: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

export default CSSModules(Header, styles);
