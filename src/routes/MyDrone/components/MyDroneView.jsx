import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './MyDroneView.scss';
import MyDroneHeader from './MyDroneHeader';
import ProviderMapContainer from '../containers/ProviderMapContainer';
import MyDronesTabsContainer from '../containers/MyDronesTabsContainer';


/*
* MyDroneView
*/

export const MyDroneView = () => (
  <div>
    <MyDroneHeader />
    <div styleName="map-container">
      <ProviderMapContainer />
    </div>

    <div styleName="my-drone-view">
      <div className="tabs-container">
        <MyDronesTabsContainer />
      </div>
    </div>
  </div>
);

MyDroneView.propTypes = {

};

export default CSSModules(MyDroneView, styles);
