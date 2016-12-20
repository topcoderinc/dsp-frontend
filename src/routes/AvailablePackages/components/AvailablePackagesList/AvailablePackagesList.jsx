import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './AvailablePackagesList.scss';
import Button from 'components/Button';
import AvailablePackagesItem from '../AvailablePackagesItem';

{
/*
* AvailablePackagesList
*/
}
export const AvailablePackagesList = ({availablePackagesData}) => (
  <div styleName="available-pakages">
    <div styleName="packages-head">
      <h4>Available Packages</h4>
      <a href="javascript:;" styleName="back-to-services">Back to services</a>
    </div>
    <div styleName="available-pakages-conatiner">
      {availablePackagesData.map((availablePackagesItemData, index) =>
        <AvailablePackagesItem key={index} availablePackagesItemData={availablePackagesItemData} />
      )}
    </div>
  </div>
);

AvailablePackagesList.propTypes = {
};

export default CSSModules(AvailablePackagesList, styles);
