import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './DroneDetailsView.scss';
import DroneDetailsHeader from '../containers/DroneDetailsHeaderContainer';
import DroneDetailsTabs from '../containers/DroneDetailsTabsContainer';

/*
* DroneDetailsView
*/

export const DroneDetailsView = () => (
  <div>
    <DroneDetailsHeader />

    <div styleName="my-drone-view">
      <div className="tabs-container">
        <DroneDetailsTabs />
      </div>
    </div>
  </div>
);

DroneDetailsView.propTypes = {

};

export default CSSModules(DroneDetailsView, styles);
