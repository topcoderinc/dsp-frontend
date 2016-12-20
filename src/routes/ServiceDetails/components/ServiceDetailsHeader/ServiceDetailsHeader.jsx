import React from 'react';
import CSSModules from 'react-css-modules';
import Button from 'components/Button';
import { Link } from 'react-router';
import styles from './ServiceDetailsHeader.scss';

/*
* ServiceDetailsHeader
*/

export const ServiceDetailsHeader = () => (
  <div styleName="service-details-header">
    <div styleName="title">Service Details</div>
    <div styleName="add-service-btn">
      <Link to="add-services">
        <Button color="blue" className={styles.btnDeleteService}>Edit Service</Button>
      </Link>
      <Button color="blue" className={styles.btnEditService}>Delete Service</Button>
    </div>
  </div>
);

ServiceDetailsHeader.propTypes = {
};

export default CSSModules(ServiceDetailsHeader, styles);
