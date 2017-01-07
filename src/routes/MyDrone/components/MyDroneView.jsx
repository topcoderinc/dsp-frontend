import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './MyDroneView.scss';
import MyDroneHeader from './MyDroneHeader';
import ProviderMapContainer from '../containers/ProviderMapContainer';
import MyDronesTabsContainer from '../containers/MyDronesTabsContainer';
import MyDronesTableContainer from '../containers/MyDronesTableContainer';

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
      <div styleName="tabs-container">
        <MyDronesTabsContainer />
      </div>
      <MyDronesTableContainer />
    </div>
  </div>
);

MyDroneView.propTypes = {

};

export default CSSModules(MyDroneView, styles);
