import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {Link} from 'react-router';
import styles from './AvailablePackagesItem.scss';
import Button from 'components/Button';
import ModalPackageDetail from '../ModalPackageDetail';


/*
* AvailablePackagesItem
*/

export const AvailablePackagesItem = ({availablePackagesItemData}) => (
  <div styleName="available-pakages-item">
    <div styleName="pakages-header">
      <div styleName="title">{availablePackagesItemData.packageType}</div>
      <div styleName="package-icon"><i styleName={availablePackagesItemData.packageIcon} /></div>
    </div>
    {/* pakages-header end */}
    <div styleName="description">
      <p>{availablePackagesItemData.description}</p>
    </div>
    {/* description end */}
    <div styleName="features">
      <div styleName="row">
        <div styleName="left-col"><i styleName="icon-feature-tick" />Delivery Speed</div>
        <div styleName="right-col">{availablePackagesItemData.delvSpeed}</div>
      </div>
      <div styleName="row">
        <div styleName="left-col"><i styleName="icon-feature-tick" />Cost per Mile</div>
        <div styleName="right-col">{availablePackagesItemData.costPerMile}</div>
      </div>
      <div styleName="row">
        <div styleName="left-col"><i styleName="icon-feature-tick" />Insurance Claim</div>
        <div styleName="right-col">{availablePackagesItemData.insuranceClaim}</div>
      </div>
      <div styleName="row">
        <div styleName="left-col"><i styleName="icon-feature-tick" />Max Weight</div>
        <div styleName="right-col">{availablePackagesItemData.maxWeight}</div>
      </div>
    </div>
    {/* features end */}
    <div styleName="price-row">
      <div styleName="package-price">{availablePackagesItemData.packagePrice}<span>/ pax</span></div>
      <div styleName="regular-price">
        <div>Regular Price</div>
        <div styleName="r-price">{availablePackagesItemData.regularPrice} / pax</div>
      </div>
    </div>
    {/* price-row end */}
    <div styleName="action-btns">
      <Link to="add-services">
        <Button color="blue" className={styles.editPckBtn}>Order Package</Button>
      </Link>
      <ModalPackageDetail />
    </div>
    {/* actions end */}
  </div>
);

AvailablePackagesItem.propTypes = {
  availablePackagesItemData: PropTypes.object.isRequired,
};

export default CSSModules(AvailablePackagesItem, styles);
