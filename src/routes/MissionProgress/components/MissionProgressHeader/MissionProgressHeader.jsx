import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './MissionProgressHeader.scss';
import MissionMarkAsModal from '../MissionMarkAsModal';

const cn = require('classnames');


/*
* MissionProgressHeader
*/

export const MissionProgressHeader = ({ statusName, handleStatus }) => (
  <div styleName="mission-progress-header">
    <div styleName="title">Xtreme Food Delivery</div>
    {/* title end */}
    <div styleName="status">
      <span>STATUS</span>
      <div styleName="current-status" className={cn({ completed: statusName === 'Completed' })}>
        <i styleName="icon-progress" className={cn({ 'icon-completed': statusName === 'Completed' })} />
        {statusName}
      </div>
    </div>
    {/* status end */}
    <div styleName="mark-as-modal">
      <MissionMarkAsModal handleStatus={handleStatus} statusName={statusName} />
    </div>
    {/* mark-as-modal end */}
  </div>
);

MissionProgressHeader.propTypes = {
  handleStatus: PropTypes.func.isRequired,
  statusName: PropTypes.string.isRequired,
};

export default CSSModules(MissionProgressHeader, styles);
