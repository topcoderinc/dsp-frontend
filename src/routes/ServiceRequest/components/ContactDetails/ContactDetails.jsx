import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Accordion from 'components/Accordion';
import FormField from 'components/FormField';
import TextField from 'components/TextField';
import styles from './ContactDetails.scss';


/*
* ContactDetails
*/

export const ContactDetails = ({fields}) => (
  <div>
    <Accordion title="Contact Details">
      <FormField label="Sample field" {...fields.sampleField1}>
        <TextField {...fields.sampleField1} />
      </FormField>
    </Accordion>
  </div>
);

ContactDetails.propTypes = {
  fields: PropTypes.object.isRequired,
};

export default CSSModules(ContactDetails, styles);
