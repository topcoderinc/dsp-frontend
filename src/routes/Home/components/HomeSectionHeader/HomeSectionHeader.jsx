import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './HomeSectionHeader.scss';
import Button from 'components/Button';

export const HomeSectionHeader = ({...props}) => (
  <div styleName="home-section-header">
    <p className="section-title">{props.title}</p>
    <a href="javascript:;">{props.seeAll}</a>
  </div>
);

HomeSectionHeader.propTypes = {
};

export default CSSModules(HomeSectionHeader, styles);
