import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './StatusDetailMapRoute.scss';
import ProviderMapContainer from '../../containers/ProviderMapContainer';


/*
* StatusDetailMapRoute
*/

export const StatusDetailMapRoute = () => (
  <div styleName="status-detail-map-route">
    <div styleName="title">Route</div>
    <ProviderMapContainer />
  </div>
);

StatusDetailMapRoute.propTypes = {
};

export default CSSModules(StatusDetailMapRoute, styles);
