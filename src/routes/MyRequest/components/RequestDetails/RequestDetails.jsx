import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import styles from './RequestDetails.scss';
import GoogleMapRoute from 'routes/StatusDetail/components/StatusDetailMapRoute/GoogleMapRoute';


export const RequestDetails = ({requestItem, index, _toggleDetail}) => (
  <div styleName="container">
    <div styleName="left-col">
      <h3>Request Details</h3>
      <div styleName="details">
        <ul>
          <li>
            <label>Package Type:</label>
            <div>{requestItem.packageType}</div>
          </li>
          <li>
            <label>Title:</label>
            <div>{requestItem.title ? requestItem.title : 'N/A'}</div>
          </li>
          <li>
            <label>{requestItem.serviceType === 'Delivery' ? 'What is being delivered:' : 'Description'}</label>
            <div>{requestItem.whatToBeDelivered ? requestItem.whatToBeDelivered : 'N/A'}</div>
          </li>
          {
            requestItem.serviceType === 'Delivery' ?
            (<li>
              <label>Pick Up Location:</label>
              <div>{requestItem.pickUpLocation ? requestItem.pickUpLocation : 'N/A'}</div>
            </li>) : null
          }
          {
            requestItem.serviceType === 'Delivery' ?
            (<li>
              <label>Drop off location</label>
              <div>{requestItem.dropOffLocation ? requestItem.dropOffLocation : 'N/A'}</div>
            </li>
            ) : null
          }
          {
            requestItem.serviceType === 'Delivery' ?
            (<li>
              <label>Weight:</label>
              <div>
                {
                  requestItem.weight ? // eslint-disable-line no-nested-ternary
                  (
                    requestItem.weight === 1 ?
                      `${requestItem.weight.toFixed(2)} lb` :
                      `${requestItem.weight.toFixed(2)} lbs`
                  ) : 'N/A'
                }
              </div>
            </li>) : null
          }
          {
            requestItem.serviceType === 'Delivery' ?
            (<li>
              <label>Distance</label>
              <div>
                {
                  requestItem.distance ? // eslint-disable-line no-nested-ternary
                  (
                    requestItem.distance === 1 ?
                    `${requestItem.distance.toFixed(2)} mile` :
                    `${requestItem.distance.toFixed(2)} miles`
                  ) :
                  'N/A'
                }
              </div>
            </li>) : null
          }
          {
            requestItem.serviceType === 'Delivery' ?
            (<li>
              <label>Requested delivery time:</label>
              <div>{requestItem.requestedDeliveryTime ? moment(requestItem.requestedDeliveryTime).format('DD MMM YYYY, HH:MM A') : 'N/A'}</div>
            </li>) : null
          }
        </ul>
      </div>
      <div styleName="customer-container">
        <h3>Customer Contact Info</h3>
        <div styleName="customer">
          <div styleName="thumbnail">
            <img alt="thumbnail" src={requestItem.customer.photoUrl} />
          </div>
          <ul>
            <li>
              <label>Name:</label>
              <div>{`${requestItem.customer.firstName} ${requestItem.customer.lastName}`}</div>
            </li>
            <li>
              <label>Phone:</label>
              <div>{requestItem.customer.phone}</div>
            </li>
            <li>
              <label>Address:</label>
              <div>{`${requestItem.customer.address.line1}, ${requestItem.customer.address.city}, ${requestItem.customer.address.state} ${requestItem.customer.address.postalCode}`}</div>
            </li>
            <li>
              <label>Email:</label>
              <div>{requestItem.customer.email}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div styleName="right-col">
      <div onClick={() => _toggleDetail(index)} styleName="close" />
      <GoogleMapRoute
        containerElement={
          <div style={{width: '100%', height: 'calc(100% - 38px)'}} />
          }
        mapElement={
          <div style={{width: '100%', height: '100%'}} />
          }
        startLocation={requestItem.startLocation}
        endLocation={requestItem.endLocation}
        zones={requestItem.zones}
      />
      <span>Expand Map</span>
    </div>
  </div>
);

RequestDetails.propTypes = {
  requestItem: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  _toggleDetail: PropTypes.func.isRequired,
};

export default CSSModules(RequestDetails, styles);
