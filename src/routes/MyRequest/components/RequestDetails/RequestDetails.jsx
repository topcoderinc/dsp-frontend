import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './RequestDetails.scss';
import RequestMapContainer from '../../containers/RequestMapContainer';

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
            <label>Pick Up Location:</label>
            <div>{requestItem.pickUpLocation}</div>
          </li>
          <li>
            <label>What is being delivered:</label>
            <div>{requestItem.deliveryObject}</div>
          </li>
          <li>
            <label>Drop off location</label>
            <div>{requestItem.dropOffLocation}</div>
          </li>
          <li>
            <label>Weight:</label>
            <div>{requestItem.weight}</div>
          </li>
          <li>
            <label>Distance</label>
            <div>{requestItem.distance}</div>
          </li>
          <li>
            <label>Requested delivery time</label>
            <div>{requestItem.requestedDeliveryTime}</div>
          </li>
          <li>
            <label>Payout:</label>
            <div>{requestItem.payout}</div>
          </li>
        </ul>
      </div>
      <div styleName="customer-container">
        <h3>Customer Contact Info</h3>
        <div styleName="customer">
          <div styleName="thumbnail">
            <img alt="thumbnail" src={require('../../../../static/img/thumbnail.png')} />
          </div>
          <ul>
            <li>
              <label>Name:</label>
              <div>{requestItem.customer.name}</div>
            </li>
            <li>
              <label>Phone:</label>
              <div>{requestItem.customer.phone}</div>
            </li>
            <li>
              <label>Address:</label>
              <div>{requestItem.customer.address}</div>
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
      <RequestMapContainer />
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
