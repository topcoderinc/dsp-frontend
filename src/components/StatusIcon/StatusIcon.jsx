import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './StatusIcon.scss';

export const StatusIcon = ({ iconType }) => (
  <div styleName="icon-container">
    {(() => {
      switch (iconType) {
        case 'in_progress':
          return (<label styleName="in_progress">In progress</label>);
        case 'completed':
          return (<label styleName="completed">Completed</label>);
        case 'cancelled':
          return (<label styleName="cancelled">Cancelled</label>);
        default:
          return (<div />);
      }
    })()}
  </div>
);

StatusIcon.propTypes = {
  iconType: PropTypes.oneOf(['in_progress', 'completed', 'cancelled']).isRequired,
};

export default CSSModules(StatusIcon, styles);
