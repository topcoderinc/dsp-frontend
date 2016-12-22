import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './BrowseServices.scss';
import BrowseServicesItem from '../BrowseServicesItem';
import HomeSectionHeader from '../HomeSectionHeader';

const BrowseServices = (props) => (
  <div styleName="browse-services">
    <HomeSectionHeader
      title={'Browse Services By Category'}
      seeAll={'See All Category'}
    />

    <div styleName="browse-services-items">
      {
        props.categories.map((category, i) => (
          <div key={i}><BrowseServicesItem category={category} /></div>
        ))
      }

    </div>
  </div>
);

BrowseServices.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CSSModules(BrowseServices, styles);
