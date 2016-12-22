import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './MissProgDetailContactRow.scss';
import MissionProgressDetail from '../MissionProgressDetail';
import MissionProgressContact from '../MissionProgressContact';


/*
* MissProgDetailContactRow
*/

export const MissProgDetailContactRow = ({requestDetail, contactInfo}) => (
  <div styleName="mission-prog-detail-contact">
    <div styleName="left-col">
      <MissionProgressDetail requestDetail={requestDetail} />
    </div>
    <div styleName="right-col">
      <MissionProgressContact contactInfo={contactInfo} />
    </div>
  </div>
);

MissProgDetailContactRow.propTypes = {
  requestDetail: PropTypes.object.isRequired,
  contactInfo: PropTypes.object.isRequired,
};

export default CSSModules(MissProgDetailContactRow, styles);
