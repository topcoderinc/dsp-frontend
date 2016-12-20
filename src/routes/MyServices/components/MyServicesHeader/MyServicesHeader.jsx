import React from 'react';
import CSSModules from 'react-css-modules';
import Button from 'components/Button';
import { Link } from 'react-router';
import styles from './MyServicesHeader.scss';


/*
* MyServicesHeader
*/

export const MyServicesHeader = () => (
  <div styleName="my-services-header">
    <div styleName="title">My Services</div>
    <div styleName="add-services-btn">
      <Link to="add-services">
        <Button color="blue" className={styles.btnAddDrone}>Add Service</Button>
      </Link>
    </div>
  </div>
);

MyServicesHeader.propTypes = {
};

export default CSSModules(MyServicesHeader, styles);
