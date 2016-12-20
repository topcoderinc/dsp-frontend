import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Checkbox from 'components/Checkbox';
import TextField from 'components/TextField';
import FormField from 'components/FormField';
import TextareaField from 'components/TextareaField';
import styles from './AddPackages.scss';

/*
* Add Service form
*/

export const AddPackages = ({fields}) => (
  <div styleName="add-package">
    <div styleName="row">
      <label htmlFor="sName">Package name:</label>
      <FormField {...fields.packageName} className="addPackageField">
        <TextField {...fields.packageName} />
      </FormField>
    </div>
    <div styleName="row">
      <label htmlFor="sName" styleName="desc-label">Description:</label>
      <TextareaField {...fields.description} />
    </div>
    <div styleName="row">
      <label htmlFor="sName">Include:</label>
      <div styleName="checkbox-options">
        <div styleName="include-row">
          <div styleName="checkbox">
            <Checkbox
              checked={fields.delvSpeed.value !== true}
              onChange={() => fields.delvSpeed.onChange(!fields.delvSpeed.value)}
              id="delvSpeed"
            >Delivery Speed</Checkbox>
          </div>
          <div styleName="input-with-label">
            <div styleName="input"><TextField {...fields.delvSpeedValue} /></div>
            <div styleName="unit">mph</div>
          </div>
        </div>
        <div styleName="include-row">
          <div styleName="checkbox">
            <Checkbox
              checked={fields.costPerMile.value !== true}
              onChange={() => fields.costPerMile.onChange(!fields.costPerMile.value)}
              id="costPerMile"
            >Cost per mile</Checkbox>
          </div>
          <div styleName="input-with-label">
            <div styleName="input"><TextField {...fields.costPerMileValue} /></div>
            <div styleName="unit">$</div>
          </div>
        </div>
        <div styleName="include-row">
          <div styleName="checkbox">
            <Checkbox
              checked={fields.insuranceClaim.value !== true}
              onChange={() => fields.insuranceClaim.onChange(!fields.insuranceClaim.value)}
              id="insuranceClaim"
            >Insurance Claim</Checkbox>
          </div>
          <div styleName="input-with-label">
            <div styleName="input"><TextField {...fields.insuranceClaimValue} /></div>
            <div styleName="unit">$</div>
          </div>
        </div>
        <div styleName="include-row">
          <div styleName="checkbox">
            <Checkbox
              checked={fields.maxWeight.value !== true}
              onChange={() => fields.maxWeight.onChange(!fields.maxWeight.value)}
              id="maxWeight"
            >Max weight</Checkbox>
          </div>
          <div styleName="input-with-label">
            <div styleName="input"><TextField {...fields.maxWeightValue} /></div>
            <div styleName="unit">kg</div>
          </div>
        </div>
      </div>
      {/* checkbox-options end */}
    </div>
    <div styleName="row">
      <label htmlFor="price">Price:</label>
      <div styleName="price-discount-row">
        <div styleName="price-input">
          <FormField {...fields.pakgPrice} className="addPackageField">
            <TextField {...fields.pakgPrice} />
          </FormField>
        </div>
        <div styleName="discount-input">
          <label htmlFor="discount" styleName="discount-label">Set discount:</label>
          <div styleName="discount-input"><TextField {...fields.discount} /></div>
        </div>
      </div>
    </div>
  </div>
);

AddPackages.propTypes = {
  fields: PropTypes.object.isRequired,
};

export default CSSModules(AddPackages, styles);
