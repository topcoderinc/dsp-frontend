import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './PromotedServiceItem.scss';

const getImage = (name) => `${window.location.origin}/img/drones/${name}`;

export const PromotedServiceItem = ({promotedService}) => (
  <div styleName="poromoted-service-item">
    <div styleName="off-percent">{promotedService.offPercent}% Off</div>
    <figure>
      <img src={getImage(promotedService.imgSrc)} alt="drone picture" styleName="drone-img" />
      <figcaption>
        <div styleName="service-name">
          <span>{promotedService.serviceName}</span>
        </div>
        <div styleName="status">{promotedService.serviceCategory}</div>
        <div styleName="off-price">
          <span styleName="original-price">$ {promotedService.price}</span>
          <span styleName="new-price">${promotedService.newPrice}</span>
        </div>
      </figcaption>
    </figure>
  </div>
);

PromotedServiceItem.propTypes = {
  promotedService: PropTypes.object.isRequired,
};

export default CSSModules(PromotedServiceItem, styles);
