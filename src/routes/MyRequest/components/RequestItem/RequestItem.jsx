import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import styles from './RequestItem.scss';
import RequestItemControls from '../RequestItemControls';
import RequestDetails from '../RequestDetails';

export const RequestItem = ({requestItem, index, isOpen, _toggleDetail, currentStatus, assignDrone, rejectRequest, completeRequest, getDrones}) => (
  <div styleName="item-container">
    <div styleName="item-summary">
      <ul>
        <li>
          <label>Request ID:</label>
          <div>{requestItem.requestId}</div>
        </li>
        {
          requestItem.serviceType === 'Delivery' ?
          (<li>
            <label>Delivery Date:</label>
            <div>{requestItem.deliveryDate ? moment(requestItem.deliveryDate).format('DD MMM YYYY HH:MM A') : 'N/A'}</div>
          </li>) : null
        }
        <li>
          <label>Distance:</label>
          <div>
            {
              requestItem.distance ? // eslint-disable-line no-nested-ternary
                (requestItem.distance === 1 ?
                  `${requestItem.distance.toFixed(2)} mile` :
                  `${requestItem.distance.toFixed(2)} miles`) :
                'N/A'
            }
          </div>
        </li>
        <li>
          <label>Service Type:</label>
          <div>{requestItem.serviceType ? requestItem.serviceType : 'N/A'}</div>
        </li>
        {
          requestItem.serviceType === 'Delivery' ?
          (<li>
            <label>Delivery Location:</label>
            <div>{requestItem.deliveryLocation ? requestItem.deliveryLocation : 'N/A'}</div>
          </li>) : null
        }
      </ul>
      <RequestItemControls
        index={index}
        isOpen={isOpen}
        _toggleDetail={_toggleDetail}
        currentStatus={currentStatus}
        assignDrone={(droneId) => assignDrone(requestItem.requestId, droneId)}
        rejectRequest={() => rejectRequest(requestItem.requestId)}
        completeRequest={() => completeRequest(requestItem.requestId)}
        getDrones={getDrones}
        requestId={requestItem.requestId}
      />
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
  currentStatus: PropTypes.string.isRequired,
  assignDrone: PropTypes.func.isRequired,
  rejectRequest: PropTypes.func.isRequired,
  completeRequest: PropTypes.func.isRequired,
  getDrones: PropTypes.func.isRequired,
};

export default CSSModules(RequestItem, styles);
