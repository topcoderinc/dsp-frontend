import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './BreadcrumbItem.scss';

export const BreadcrumbItem = ({title}) => (
  <span styleName="breadcrumb-item">
    {title}
  </span>
);

BreadcrumbItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CSSModules(BreadcrumbItem, styles);
