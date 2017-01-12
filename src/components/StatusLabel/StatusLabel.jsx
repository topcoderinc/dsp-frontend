import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './StatusLabel.scss';
import _ from 'lodash';

const statusLabels = {
  'in-progress': 'In Progress', // new style
  inProgress: 'In Progress', // old style should be removed when all code is binded to backend
  cancelled: 'Cancelled',
  completed: 'Completed',
  pending: 'Pending',
  scheduled: 'Scheduled',
  rejected: 'Rejected',
  waiting: 'Waiting',
};

export const StatusLabel = ({value}) => (
  <span styleName={`status-label_${value.toLowerCase().replace('-', '')}`}>
    <span>{statusLabels[value]}</span>
  </span>
);

StatusLabel.propTypes = {
  value: PropTypes.oneOf(_.keys(statusLabels)).isRequired,
};

export default CSSModules(StatusLabel, styles);
