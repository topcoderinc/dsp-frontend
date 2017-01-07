import React from 'react';
import CSSModules from 'react-css-modules';
import {Link} from 'react-router';
import styles from './AdminHeader.scss';
import Dropdown from '../Dropdown';

export const AdminHeader = () => (
  <nav styleName="admin-header">
    <ul>
      <li styleName="branding">
        DRONE MARKET
      </li>
      <li styleName="pages">
        <ul>
          <li>
            <Link activeClassName="active" to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link activeClassName="active" to="/admin/no-fly-zones">No Fly Zones</Link>
          </li>
        </ul>
      </li>
      <li key="notification" styleName="notifications" />
      <li key="welcome" >
        <Dropdown title={<span>Welcome,<br />Admin</span>}>
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

AdminHeader.propTypes = {

};

export default CSSModules(AdminHeader, styles);
