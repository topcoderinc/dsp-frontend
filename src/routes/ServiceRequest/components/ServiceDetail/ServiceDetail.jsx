import React, {PropTypes, Component} from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import cn from 'classnames';
import {browserHistory} from 'react-router';
import Button from 'components/Button';
import {reduxForm} from 'redux-form';
import Location from '../Location';
import ItemRequest from '../ItemRequest';
import Zones from '../Zones';
import ContactDetails from '../ContactDetails';
import Address from '../Address';
import Spinner from 'components/Spinner';
import styles from './ServiceDetail.scss';


/*
* ServiceDetail
*/

class ServiceDetail extends Component {
  constructor() {
    super();
    this.state = {
      spinner: {
        open: false,
        content: null,
      },
    };
  }

  onSubmit(values, dispatch, state) {
    const {sendRequest} = this.props;
    this.setState({
      spinner: {
        open: true,
        content: 'Sending, please wait...',
        error: false,
      },
    },
    () => {
      sendRequest(values, state).catch((res) => {
        this.setState({
          spinner: {
            open: true,
            content: JSON.parse(res.response.text).error,
            error: true,
          },
        }, () => {
          setTimeout(() => {
            this.setState({
              spinner: {
                open: false,
                content: null,
                error: false,
              },
            });
          }, 2500);
        });
      });
    });
  }

  render() {
    const {fields, handleSubmit, startLocation, endLocation,
            cancelForm, zones, serviceType, clearAddress,
            selectAddress, ...rest} = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} styleName="service-detail">
          {
            serviceType === 'Delivery' ?
            (
              <div styleName="locations">
                <Location
                  type="start"
                  address={startLocation}
                  clearAddress={() => {
                    fields.startState.onChange('');
                    fields.startCity.onChange('');
                    fields.startPostalCode.onChange('');
                    fields.startLine1.onChange('');
                    fields.startLine2.onChange('');
                    clearAddress('start');
                  }}
                  selectAddress={selectAddress}
                  error={!!(fields.startCoor.touched && fields.startCoor.error)}
                />
                <Location
                  type="end"
                  address={endLocation}
                  clearAddress={() => {
                    fields.endState.onChange('');
                    fields.endCity.onChange('');
                    fields.endPostalCode.onChange('');
                    fields.endLine1.onChange('');
                    fields.endLine2.onChange('');
                    clearAddress('end');
                  }}
                  selectAddress={selectAddress}
                  error={!!(fields.endCoor.touched && fields.endCoor.error)}
                />
              </div>
            ) : null
          }
          {/* locations end */}
          <div styleName={cn({data: true, 'data-image': serviceType === 'Imagery'})}>
            <ItemRequest fields={fields} serviceType={serviceType} />
            {
              serviceType === 'Imagery' ?
              (<Zones {...rest} zones={zones} styles={null} error={!!(fields.zones.touched && fields.zones.error)} />) :
              null
            }
            {
              serviceType === 'Delivery' ?
              (
                <div>
                  <Address
                    type="start"
                    state={fields.startState}
                    city={fields.startCity}
                    postalCode={fields.startPostalCode}
                    line1={fields.startLine1}
                    line2={fields.startLine2}
                    location={startLocation}
                  />
                  <Address
                    type="end"
                    state={fields.endState}
                    city={fields.endCity}
                    postalCode={fields.endPostalCode}
                    line1={fields.endLine1}
                    line2={fields.endLine2}
                    location={endLocation}
                  />
                  <ContactDetails fields={fields} />
                </div>
              ) : null
            }
          </div>
          {/* data end */}
          <div styleName="actions">
            <Button
              color="gray"
              onClick={
                () => {
                  cancelForm();
                  browserHistory.push('/home');
                }
              }
              className={styles.btnMargin}
            >Cancel</Button>
            <Button type="submit" color="blue">Send Request</Button>
          </div>
          {/* actions end */}
        </form>
        <Spinner
          isOpen={this.state.spinner.open}
          content={this.state.spinner.content}
          error={this.state.spinner.error}
        />
      </div>
    );
  }
}

ServiceDetail.propTypes = {
  fields: PropTypes.object.isRequired,
  zones: PropTypes.array.isRequired,
  startLocation: PropTypes.object,
  endLocation: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  cancelForm: PropTypes.func.isRequired,
  serviceType: PropTypes.string.isRequired,
  sendRequest: PropTypes.func.isRequired,
  clearAddress: PropTypes.func.isRequired,
  selectAddress: PropTypes.func.isRequired,
};


const fields = ['date', 'weight', 'description', 'contactName', 'contactPhone', 'title',
  'startCoor', 'startState', 'startCity', 'startPostalCode', 'startLine1', 'startLine2',
  'endCoor', 'endState', 'endCity', 'endPostalCode', 'endLine1', 'endLine2', 'zones'];

const validate = (values, {serviceType, startLocation, endLocation, zones}) => {
  const errors = {};
  if (serviceType === 'Delivery') {
    if (values.weight && !/^\d*\.?\d+$/.test(values.weight)) {
      errors.weight = 'should be number';
    }

    if (!startLocation) {
      errors.startCoor = 'required';
    }

    if (!endLocation) {
      errors.endCoor = 'required';
    }

    _.forEach(['date', 'contactName', 'contactPhone',
      'startState', 'startCity', 'startPostalCode', 'startLine1', 'endCity',
      'endState', 'endPostalCode', 'endLine1'], (key) => {
      if (!values[key]) {
        errors[key] = 'required';
      }
    });
  } else if (!zones || zones.length === 0) {
    errors.zones = 'required';
  }

  if (!values.title) {
    errors.title = 'required';
  }

  if (!values.description) {
    errors.description = 'required';
  }

  return errors;
};

export default reduxForm({form: 'serviceRequest', fields, validate})(CSSModules(ServiceDetail, styles, {allowMultiple: true}));
