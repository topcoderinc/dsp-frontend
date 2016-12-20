import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './MissProgRouteCameraRow.scss';
import StatusDetailCamera from '../StatusDetailCamera';
import StatusDetailMapRoute from '../StatusDetailMapRoute';


/*
* MissProgRouteCameraRow
*/

export const MissProgRouteCameraRow = ({statusName}) => (
  <div styleName="mission-prog-route-camera">
    <div styleName="left-col">
      {statusName === 'Completed' && <StatusDetailMapRoute />}
      {statusName !== 'Completed' && <StatusDetailMapRoute />}
    </div>
    <div styleName="right-col">
      <StatusDetailCamera statusName={statusName} />
    </div>
  </div>
);

MissProgRouteCameraRow.propTypes = {
  statusName: PropTypes.string.isRequired,
};

export default CSSModules(MissProgRouteCameraRow, styles);
