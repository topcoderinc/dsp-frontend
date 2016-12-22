import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './HomeSectionHeader.scss';

export const HomeSectionHeader = (props) => (
  <div styleName="home-section-header">
    <p className="section-title">{props.title}</p>
    <a href="javascript:;">{props.seeAll}</a>
  </div>
);

HomeSectionHeader.propTypes = {
  title: PropTypes.string,
  seeAll: PropTypes.string,
};

export default CSSModules(HomeSectionHeader, styles);
