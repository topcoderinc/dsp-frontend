import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './BrowseServicesItem.scss';

const getImage = (name) => `${window.location.origin}/img/categories/${name}`;

export const BrowseServicesItem = ({category}) => (
  <div styleName="browse-services-item">
    <div styleName="category">
      <div styleName="category-img"><img src={getImage(category.categoryImgSrc)} alt="Service Category" /></div>
      <div styleName="category-type">
        <div styleName={category.iconName} />
      </div>
      <div styleName="type-name">{category.categoryName}</div>
    </div>
  </div>
);

BrowseServicesItem.propTypes = {
  category: PropTypes.object.isRequired,
};

export default CSSModules(BrowseServicesItem, styles);
