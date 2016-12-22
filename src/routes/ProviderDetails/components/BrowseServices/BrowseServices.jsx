import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './BrowseServices.scss';
import BrowseServicesItem from '../BrowseServicesItem';

class BrowseServices extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div styleName="browse-services">

        <div styleName="header">Services</div>

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
