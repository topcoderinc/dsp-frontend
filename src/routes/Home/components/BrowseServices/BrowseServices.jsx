import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './BrowseServices.scss';
import BrowseServicesItem from '../BrowseServicesItem';
import HomeSectionHeader from '../HomeSectionHeader';

class BrowseServices extends Component {

  render() {
    return (
      <div styleName="browse-services">
        <HomeSectionHeader
          title={'Browse Services By Category'}
          seeAll={'See All Category'}
        />

        <div styleName="browse-services-items">
          {
            this.props.categories.map((category, i) => (
              <div key={i}><BrowseServicesItem category={category} /></div>
            ))
          }

        </div>
      </div>
    );
  }
}

BrowseServices.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CSSModules(BrowseServices, styles);
