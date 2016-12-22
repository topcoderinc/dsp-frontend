import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './ServiceInfoDetails.scss';

const getImage = (name) => `${window.location.origin}/img/myDrones/${name}`;

/*
* ServiceInfoDetails
*/

export const ServiceInfoDetails = ({serviceInfoDetails}) => (
  <div styleName="service-info-details">
    <img src={getImage('drone-lg.png')} alt="service" />
    <div styleName="service-info">
      <h4>{serviceInfoDetails.serviceName}</h4>
      <h6>Pricing: {serviceInfoDetails.price}</h6>
      <p>{serviceInfoDetails.discription1}</p>
      <p>{serviceInfoDetails.discription2}</p>
    </div>
  </div>
);

ServiceInfoDetails.propTypes = {
  serviceInfoDetails: PropTypes.object.isRequired,
};

export default CSSModules(ServiceInfoDetails, styles);
