import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import StatusLabel from 'components/StatusLabel';
import styles from './StatusDetailHeader.scss';

export const StatusDetailHeader = ({ title, status, children }) => (
  <div styleName="status-detail-header">
    <h1 styleName="title">{title}</h1>
    <div styleName="status">
      <span styleName="status-label">STATUS</span>
      <StatusLabel styleName="status-value" value={status} />
    </div>
    <div styleName="right">
      {children}
    </div>
  </div>
);

StatusDetailHeader.propTypes = {
  title: PropTypes.string.isRequired,
  status: StatusLabel.propTypes.value,
  children: PropTypes.any,
};

export default CSSModules(StatusDetailHeader, styles);
