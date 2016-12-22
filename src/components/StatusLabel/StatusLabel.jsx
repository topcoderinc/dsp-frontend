import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './StatusLabel.scss';

const statusLabels = {
  inProgress: 'In Progress',
  cancelled: 'Cancelled',
  completed: 'Completed',
};

export const StatusLabel = ({value}) => (
  <span styleName={`status-label_${value.toLowerCase()}`}>
    <span>{statusLabels[value]}</span>
  </span>
);

StatusLabel.propTypes = {
  value: PropTypes.oneOf(['inProgress', 'cancelled', 'completed']).isRequired,
};

export default CSSModules(StatusLabel, styles);
