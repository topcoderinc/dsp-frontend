import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './PromotedService.scss';
import PromotedServiceItem from '../PromotedServiceItem';
import HomeSectionHeader from '../HomeSectionHeader';

const PromotedService = (props) => (
  <div styleName="promote-service">
    <HomeSectionHeader
      title={'Promoted Services Nearby Jakarta, Indonesia'}
      seeAll={'See all services'}
    />

    <div styleName="promote-service-items">
      {
        props.promotedServices.map((service, i) => (
          <div key={i}><PromotedServiceItem promotedService={service} /></div>
        ))
      }
    </div>
  </div>
);

PromotedService.propTypes = {
  promotedServices: PropTypes.array.isRequired,
};

export default CSSModules(PromotedService, styles);
