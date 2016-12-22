import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Button from 'components/Button';
import {Link} from 'react-router';
import styles from './AvailablePackagesItem.scss';

/*
* AvailablePackagesItem
*/

export const AvailablePackagesItem = ({AvailablePackagesItemData}) => (
  <div styleName="available-pakages-item">
    <div styleName="pakages-header">
      <div styleName="title">{AvailablePackagesItemData.packageType}</div>
      <div styleName="package-icon"><i styleName={AvailablePackagesItemData.packageIcon} /></div>
    </div>
    {/* pakages-header end */}
    <div styleName="description">
      <p>{AvailablePackagesItemData.description}</p>
    </div>
    {/* description end */}
    <div styleName="features">
      <div styleName="row">
        <div styleName="left-col"><i styleName="icon-feature-tick" />Delivery Speed</div>
        <div styleName="right-col">{AvailablePackagesItemData.delvSpeed}</div>
      </div>
      <div styleName="row">
        <div styleName="left-col"><i styleName="icon-feature-tick" />Cost per Mile</div>
        <div styleName="right-col">{AvailablePackagesItemData.costPerMile}</div>
      </div>
      <div styleName="row">
        <div styleName="left-col"><i styleName="icon-feature-tick" />Insurance Claim</div>
        <div styleName="right-col">{AvailablePackagesItemData.insuranceClaim}</div>
      </div>
      <div styleName="row">
        <div styleName="left-col"><i styleName="icon-feature-tick" />Max Weight</div>
        <div styleName="right-col">{AvailablePackagesItemData.maxWeight}</div>
      </div>
    </div>
    {/* features end */}
    <div styleName="price-row">
      <div styleName="package-price">{AvailablePackagesItemData.packagePrice}<span>/ pax</span></div>
      <div styleName="regular-price">
        <div>Regular Price</div>
        <div styleName="r-price">{AvailablePackagesItemData.regularPrice} / pax</div>
      </div>
    </div>
    {/* price-row end */}
    <div styleName="action-btns">
      <Link to="add-services">
        <Button color="blue" className={styles.editPckBtn}>Edit Package</Button>
      </Link>
      <a href="javascript:;" styleName="view-btn">View Samples</a>
    </div>
    {/* actions end */}
  </div>
);

AvailablePackagesItem.propTypes = {
  AvailablePackagesItemData: PropTypes.object.isRequired,
};

export default CSSModules(AvailablePackagesItem, styles);
