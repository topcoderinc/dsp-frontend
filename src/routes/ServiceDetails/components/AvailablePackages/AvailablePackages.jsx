import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './AvailablePackages.scss';
import AvailablePackagesItem from '../AvailablePackagesItem';

/*
* AvailablePackages
*/

export const AvailablePackages = ({AvailablePackagesData}) => (
  <div styleName="available-pakages">
    <h4>Available Packages</h4>
    <div styleName="available-pakages-conatiner">
      {AvailablePackagesData.map((AvailablePackagesItemData, index) =>
        <AvailablePackagesItem key={index} AvailablePackagesItemData={AvailablePackagesItemData} />
      )}
    </div>
  </div>
);

AvailablePackages.propTypes = {
  AvailablePackagesData: PropTypes.array.isRequired,
};

export default CSSModules(AvailablePackages, styles);
