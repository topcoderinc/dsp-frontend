import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './DroneDetailsView.scss';
import DroneDetailsHeader from './DroneDetailsHeader';
import DroneDetailsTabsContainer from '../containers/DroneDetailsTabsContainer';

/*
* DroneDetailsView
*/

export const DroneDetailsView = () => (
  <div>
    <DroneDetailsHeader />

    <div styleName="my-drone-view">
      <div className="tabs-container">
        <DroneDetailsTabsContainer />
      </div>
    </div>
  </div>
);

DroneDetailsView.propTypes = {

};

export default CSSModules(DroneDetailsView, styles);
