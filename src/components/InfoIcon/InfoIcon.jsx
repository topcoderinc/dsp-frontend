import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Tooltip from 'rc-tooltip';
import styles from './InfoIcon.scss';

export const InfoIcon = ({children, cName, position}) => (
  <div styleName="info-icon">
    <Tooltip placement={position} trigger={['hover', 'click']} overlay={children}>
      <div styleName="icon" className={cName} />
    </Tooltip>
  </div>
);

InfoIcon.propTypes = {
  children: PropTypes.any.isRequired,
};

export default CSSModules(InfoIcon, styles);
