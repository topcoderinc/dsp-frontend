import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './MissionProgressView.scss';
import MissProgDetailContactContainer from '../containers/MissProgDetailContactContainer';
import MissionProgressHeaderContainer from '../containers/MissionProgressHeaderContainer';
import MissProgDroneEstimateContainer from '../containers/MissProgDroneEstimateContainer';
import MissProgRouteCameraContainer from '../containers/MissProgRouteCameraContainer';
import MissionGalleryContainer from '../containers/MissionGalleryContainer';


export const MissionProgressView = () => (
  <div>
    <MissionProgressHeaderContainer />

    <div styleName="mission-progress-view">

      <MissProgDetailContactContainer />

      <MissProgDroneEstimateContainer />

      <MissProgRouteCameraContainer />

      <MissionGalleryContainer />

    </div>
  </div>
);

MissionProgressView.propTypes = {

};

export default CSSModules(MissionProgressView, styles);
