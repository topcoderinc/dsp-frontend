import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Accordion from 'components/Accordion';
import FormField from 'components/FormField';
import TextField from 'components/TextField';
import styles from './EstimatedAmountToPay.scss';


/*
* EstimatedAmountToPay
*/

export const EstimatedAmountToPay = ({fields}) => (
  <div>
    <Accordion title="Estimated Amount to Pay">
      <FormField label="Sample field" {...fields.sampleField2}>
        <TextField {...fields.sampleField2} />
      </FormField>
    </Accordion>
  </div>
);

EstimatedAmountToPay.propTypes = {
  fields: PropTypes.object.isRequired,
};

export default CSSModules(EstimatedAmountToPay, styles);
