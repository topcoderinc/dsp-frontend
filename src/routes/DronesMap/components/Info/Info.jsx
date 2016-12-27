import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Info.scss';

export const Info = ({ drone: { name, serialNumber }, showHistory }) => (
  <div styleName="info">
    <div styleName="group">
      <div styleName="label">Drone Name</div>
      <div styleName="text">{name}</div>
    </div>
    <div styleName="group">
      <div styleName="label">Serial Number</div>
      <div styleName="text">{serialNumber}</div>
    </div>
    <div styleName="group">
      <a href="javascript:;" onClick={showHistory}>Show History</a>
    </div>
  </div>
);

Info.propTypes = {
  drone: PropTypes.object.isRequired,
  showHistory: PropTypes.func.isRequired,
};

export default CSSModules(Info, styles);
