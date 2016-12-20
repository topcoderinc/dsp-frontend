import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Accordion from 'components/Accordion';
import FormField from 'components/FormField';
import TextField from 'components/TextField';
import Row from 'components/Row';
import InfoIcon from 'components/InfoIcon';
import Checkbox from 'components/Checkbox';
import DatePicker from 'components/DatePicker';
import Select from 'components/Select';
import _ from 'lodash';
import styles from './ItemRequest.scss';

const worthOptions = [
  { value: 1, label: '100 - 5000 $' },
  { value: 2, label: '5001 - 10000 $' },
  { value: 3, label: '> 10001 $' },
];

const weightOptions = [
  { value: 1, label: '0 - 500 gms' },
  { value: 2, label: '501 - 2500 gms' },
  { value: 3, label: '> 2500 gms' },
];


/*
* ItemRequest
*/

export const ItemRequest = ({fields}) => (
  <div styleName="item-request">
    <Accordion title="Item Request" defaultIsExpanded>
      <div>
        <FormField label="Delivery Item" {...fields.name}>
          <TextField {...fields.name} />
        </FormField>
      </div>
      <FormField label="Delivery date" {...fields.date}>
        <DatePicker {...fields.date} />
      </FormField>
      <Row>
        <FormField label="Item worth" {...fields.worth}>
          <Select
            clearable={false}
            options={worthOptions}
            {..._.pick(fields.worth, 'value', 'onChange')}
          />
        </FormField>
        <FormField label="Weight" {...fields.weight}>
          <Select
            clearable={false}
            options={weightOptions}
            {..._.pick(fields.weight, 'value', 'onChange')}
          />
        </FormField>
      </Row>
      {/* Row end */}
      <Row>
        <FormField {...fields.dimension} label={<span className={styles.center}>Icon Dimension &nbsp;<InfoIcon position="right">Length X Width X Height</InfoIcon></span>}>
          <TextField {...fields.dimension} />
        </FormField>
        <FormField>
          <Checkbox
            checked={fields.hazardous.value === true}
            onChange={() => fields.hazardous.onChange(!fields.hazardous.value)}
            id="hazardous"
          >
            hazardous materials?
          </Checkbox>
        </FormField>
      </Row>
      {/* Row end */}
    </Accordion>
  </div>
);

ItemRequest.propTypes = {
  fields: PropTypes.object.isRequired,
};

export default CSSModules(ItemRequest, styles);
