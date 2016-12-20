import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './ServiceDetailsView.scss';
import ServiceDetailsHeader from './ServiceDetailsHeader';
import ServiceInfoDetails from './ServiceInfoDetails';
import AvailablePackagesContainer from '../containers/AvailablePackagesContainer';


export const ServiceDetailsView = ({serviceInfoDetails}) => (
  <div>
    <ServiceDetailsHeader />

    <div styleName="my-service-view">
      <ServiceInfoDetails serviceInfoDetails={serviceInfoDetails} />
      <AvailablePackagesContainer />
    </div>
  </div>
);

ServiceDetailsView.propTypes = {
  serviceInfoDetails: PropTypes.object.isRequired,
};

export default CSSModules(ServiceDetailsView, styles);
