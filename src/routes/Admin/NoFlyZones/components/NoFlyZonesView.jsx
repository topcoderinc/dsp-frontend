import React from 'react';
import CSSModules from 'react-css-modules';
import NfzMapContainer from '../containers/NfzMapContainer';
import NfzListContainer from '../containers/NfzListContainer';
import styles from './NoFlyZonesView.scss';

export const NoFlyZonesView = () => (
  <div styleName="no-fly-zones-view">
    <div styleName="col-1">
      <NfzListContainer />
    </div>
    <div styleName="col-2">
      <NfzMapContainer />
    </div>
  </div>
);

export default CSSModules(NoFlyZonesView, styles);
