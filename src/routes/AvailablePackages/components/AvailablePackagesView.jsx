import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './AvailablePackagesView.scss';
import DroneDetailBanner from './DroneDetailBanner';
import AvailablePackagesList from './AvailablePackagesList';

/*
* AvailablePackagesView
*/

export const AvailablePackagesView = ({availablePackagesData}) => (
  <div>
    <div styleName="drone-details-view">

      <DroneDetailBanner />

      <AvailablePackagesList availablePackagesData={availablePackagesData} />
    </div>
  </div>
);

AvailablePackagesView.propTypes = {
  availablePackagesData: PropTypes.array.isRequired,
};

export default CSSModules(AvailablePackagesView, styles);
