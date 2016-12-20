import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Button from 'components/Button';
import TextField from 'components/TextField';
import FormField from 'components/FormField';
import TextareaField from 'components/TextareaField';
import { reduxForm } from 'redux-form';
import styles from './AddServicesForm.scss';
import AddPackages from '../AddPackages';

/*
* Add Service form
*/

export const AddServicesForm = ({fields, handleSubmit, resetForm, addPackages, addPackageHandle}) => (
  <div styleName="add-services-form">
    <form onSubmit={handleSubmit}>
      <div styleName="row">
        <label htmlFor="sName">Service name:</label>
        <FormField {...fields.serviceName} className="service-field">
          <TextField {...fields.serviceName} />
        </FormField>
      </div>

      <div styleName="row">
        <label htmlFor="sName">Pricing:</label>
        <FormField {...fields.pricing} className="service-field">
          <TextField {...fields.pricing} />
        </FormField>
      </div>
      <div styleName="row">
        <label htmlFor="sName" styleName="desc-label">Service description:</label>
        <FormField {...fields.servDescription} className="service-field">
          <TextareaField {...fields.servDescription} />
        </FormField>
      </div>
      {/* add-package start */}
      <h4>Add Packages</h4>
      {
        addPackages.map((pckg, index) => <AddPackages key={index} fields={fields} />)
      }
      <div styleName="row">
        <label htmlFor="addPackage" />
        <a href="javascript:;" styleName="add-more-btn" onClick={() => addPackageHandle({})}>+ Add More Packages</a>
      </div>
      {/* add-package end */}
      <div styleName="actions">
        <Button color="gray" onClick={resetForm} className={styles.btnMargin}>Cancel</Button>
        <Button type="submit" color="blue">Save</Button>
      </div>
    </form>
    {/* foorm end */}
  </div>
);

AddServicesForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  addPackages: PropTypes.array.isRequired,
  addPackageHandle: PropTypes.func.isRequired,
};

const fields = ['serviceName', 'pricing', 'pakgPrice', 'servDescription', 'packageName', 'description',
  'delvSpeed', 'delvSpeedValue', 'discount', 'price', 'maxWeightValue', 'maxWeight',
  'insuranceClaimValue', 'insuranceClaim', 'costPerMileValue', 'costPerMile'];

const validate = (values) => {
  const errors = {};
  if (!values.serviceName) {
    errors.serviceName = 'required';
  }
  if (!values.pricing) {
    errors.pricing = 'required';
  }
  if (!values.packageName) {
    errors.packageName = 'required';
  }
  if (!values.pakgPrice) {
    errors.pakgPrice = 'required';
  }

  return errors;
};

export default reduxForm({ form: 'editDrones', fields, validate })(CSSModules(AddServicesForm, styles));
