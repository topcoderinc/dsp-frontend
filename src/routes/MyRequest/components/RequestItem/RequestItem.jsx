import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './RequestItem.scss';
import RequestItemControls from '../RequestItemControls';
import RequestDetails from '../RequestDetails';

export const RequestItem = ({ requestItem, index, isOpen, _toggleDetail }) => (
  <div styleName="item-container">
    <div styleName="item-summary">
      <ul>
        <li>
          <label>Request ID:</label>
          <div>{requestItem.requestId}</div>
        </li>
        <li>
          <label>Delivery Date:</label>
          <div>{requestItem.deliveryDate}</div>
        </li>
        <li>
          <label>Distance:</label>
          <div>{requestItem.distance}</div>
        </li>
        <li>
          <label>Service Type:</label>
          <div>{requestItem.serviceType}</div>
        </li>
        <li>
          <label>Delivery Location:</label>
          <div>{requestItem.deliveryLocation}</div>
        </li>
        <li>
          <label>Payout:</label>
          <div>$ {requestItem.payout}</div>
        </li>
      </ul>
      <RequestItemControls index={index} isOpen={isOpen} _toggleDetail={_toggleDetail} />
    </div>
    {(() => {
      if (isOpen) {
        return (<RequestDetails index={index} requestItem={requestItem} _toggleDetail={_toggleDetail} />);
      }
      return <div />;
    })()}
  </div>
);

RequestItem.propTypes = {
  requestItem: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  _toggleDetail: PropTypes.func.isRequired,
};

export default CSSModules(RequestItem, styles);
