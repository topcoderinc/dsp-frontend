import React, {PropTypes, Component} from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import Accordion from 'components/Accordion';
import FormField from 'components/FormField';
import TextField from 'components/TextField';
import Row from 'components/Row';
import styles from './Address.scss';


/*
* Address
*/

class Address extends Component {

  componentWillReceiveProps(nextProps) {
    const {state, location, city, postalCode, line1, line2} = this.props;
    const {location: newLocation} = nextProps;
    if (newLocation && !_.isEqual(location, newLocation)) {
      state.onChange(newLocation.state);
      city.onChange(newLocation.city);
      postalCode.onChange(newLocation.postalCode);
      line1.onChange(newLocation.line1);
      line2.onChange(newLocation.line2);
    }
  }

  render() {
    const {type, state, city, postalCode, line1, line2} = this.props;
    return (
      <div>
        <Accordion title={`${type === 'start' ? 'Starting' : 'Target'} Address`}>
          <Row>
            <FormField label="State" {...state}>
              <TextField {...state} />
            </FormField>
            <FormField label="City" {...city}>
              <TextField {...city} />
            </FormField>
            <FormField label="Postal code" {...postalCode}>
              <TextField {...postalCode} />
            </FormField>
          </Row>
          <FormField label="Street 1" {...line1}>
            <TextField {...line1} />
          </FormField>
          <FormField label="Street 2" {...line2}>
            <TextField {...line2} />
          </FormField>
        </Accordion>
      </div>
    );
  }
}

Address.propTypes = {
  type: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired,
  city: PropTypes.object.isRequired,
  postalCode: PropTypes.object.isRequired,
  line1: PropTypes.object.isRequired,
  line2: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export default CSSModules(Address, styles);
