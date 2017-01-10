import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Accordion from 'components/Accordion';
import FormField from 'components/FormField';
import TextField from 'components/TextField';
import Row from 'components/Row';
import styles from './ContactDetails.scss';


/*
* ContactDetails
*/

export const ContactDetails = ({fields}) => (
  <div>
    <Accordion title="Contact Details">
      <Row>
        <FormField label="Name" {...fields.contactName}>
          <TextField {...fields.contactName} />
        </FormField>
        <FormField label="Phone" {...fields.contactPhone}>
          <TextField {...fields.contactPhone} />
        </FormField>
      </Row>
    </Accordion>
  </div>
);

ContactDetails.propTypes = {
  fields: PropTypes.object.isRequired,
};

export default CSSModules(ContactDetails, styles);
