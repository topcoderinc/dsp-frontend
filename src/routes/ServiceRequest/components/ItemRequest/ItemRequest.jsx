import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Accordion from 'components/Accordion';
import FormField from 'components/FormField';
import TextField from 'components/TextField';
import TextareaField from 'components/TextareaField';
import DatePicker from 'components/DatePicker';
import styles from './ItemRequest.scss';

/*
* ItemRequest
*/

export const ItemRequest = ({fields, serviceType}) => (
  <div styleName="item-request">
    <Accordion title="Item Request" defaultIsExpanded>
      {
        serviceType === 'Delivery' ?
        (
          <div>
            <FormField label="Launch date" {...fields.date}>
              <DatePicker {...fields.date} />
            </FormField>
            <div styleName="unit-group">
              <div styleName="input">
                <FormField label="Weight" {...fields.weight}>
                  <TextField {...fields.weight} />
                </FormField>
              </div>
              <span styleName="unit">lbs</span>
            </div>
          </div>
        ) : null
      }
      <FormField label="Title" {...fields.title}>
        <TextField {...fields.title} />
      </FormField>
      <FormField label="Description" {...fields.description}>
        <TextareaField {...fields.description} />
      </FormField>
    </Accordion>
  </div>
);

ItemRequest.propTypes = {
  fields: PropTypes.object.isRequired,
  serviceType: PropTypes.string.isRequired,
};

export default CSSModules(ItemRequest, styles);
