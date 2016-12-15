import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import SearchInput from '../SearchInput';
import Dropdown from '../Dropdown';
import styles from './Header.scss';

export const Header = ({location, selectedCategory, categories, user, notifications, routes}) => (
  <nav styleName="header">
    <ul>
      <li styleName="branding">
        DRONE MARKET
      </li>
      {
        (() => {
          const currentRoute = routes[routes.length - 1].name;
          if (currentRoute === 'ServiceRequest') {
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
                <li className={currentRoute === 'MyDrones' ? 'active' : null}>My Drones</li>
                <li className={currentRoute === 'MyServices' ? 'active' : null}>My Services</li>
                <li className={currentRoute === 'Analytics' ? 'active' : null}>Analytics</li>
                <li className={currentRoute === 'DroneMap' ? 'active' : null}><Link to="/drones-map">Drone Traffic</Link></li>       
              </ul>
            </li>
          );
        })()
      }
      <li styleName="notifications">
        {notifications.length > 0 && <span styleName="counter">{notifications.length}</span>}
      </li>
      <li>
        <Dropdown title={selectedCategory}>
          <ul>
            {categories.map((item, i) => <li key={i}><a href="javascript:">{item.name}</a></li>)}
          </ul>
        </Dropdown>
      </li>
      <li styleName="user">
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
      </li>
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
};

export default CSSModules(Header, styles);
