import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import styles from './Breadcrumb.scss';

export const Breadcrumb = ({ items }) => (
  <ul styleName="breadcrumb">
    {items.map((item, index) => (
      <li styleName="item" key={index}>
        {item.path
          ? <Link to={item.path}>{item.text}</Link>
          : <span key={index}>{item.text}</span>}
      </li>
    ))}
  </ul>
);

const BreadcrumbItemPropType = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string,
};

Breadcrumb.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape(BreadcrumbItemPropType)
  ).isRequired,
};

export default CSSModules(Breadcrumb, styles);
