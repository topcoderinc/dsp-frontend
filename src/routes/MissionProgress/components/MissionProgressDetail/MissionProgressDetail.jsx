import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './MissionProgressDetail.scss';


/*
* MissionProgressDetail
*/

export const MissionProgressDetail = ({requestDetail}) => (
  <div styleName="mission-progress-detail">
    <div styleName="title">Request Detail</div>
    <div styleName="detail-col">
      <div styleName="left-col">
        <div styleName="data-row">
          <div styleName="lable">Service type:</div>
          <div styleName="value">{requestDetail.serviceType}</div>
        </div>
        <div styleName="data-row">
          <div styleName="lable">Package type:</div>
          <div styleName="value">{requestDetail.packageType}</div>
        </div>
        <div styleName="data-row">
          <div styleName="lable">What is being delivered:</div>
          <div styleName="value">{requestDetail.whatIsBeingDelivered}</div>
        </div>
        <div styleName="data-row">
          <div styleName="lable">Weight:</div>
          <div styleName="value">{requestDetail.weight}</div>
        </div>
        <div styleName="data-row">
          <div styleName="lable">Requested delivery time:</div>
          <div styleName="value">{requestDetail.requestedDeliveryTime}</div>
        </div>
      </div>
      {/* left-col end */}
      <div styleName="right-col">
        <div styleName="data-row">
          <div styleName="lable">Pick up location:</div>
          <div styleName="value">{requestDetail.pickUpLocation.streetAddress}<br />
            {requestDetail.pickUpLocation.city},
{requestDetail.pickUpLocation.State} {requestDetail.pickUpLocation.zip}</div>
        </div>
        <div styleName="data-row">
          <div styleName="lable">Drop off location:</div>
          <div styleName="value">{requestDetail.dropOffLocation.streetAddress}<br />
            {requestDetail.dropOffLocation.city},
{requestDetail.dropOffLocation.State} {requestDetail.dropOffLocation.zip}</div>
        </div>
        <div styleName="data-row">
          <div styleName="lable">Estimated Distance:</div>
          <div styleName="value">{requestDetail.estimatedDistance}</div>
        </div>
        <div styleName="data-row">
          <div styleName="lable">Price:</div>
          <div styleName="value">$ 999.99</div>
        </div>
      </div>
      {/* right-col end */}
    </div>
    {/* detail-col end */}
  </div>
);

MissionProgressDetail.propTypes = {
  requestDetail: PropTypes.object.isRequired,
};

export default CSSModules(MissionProgressDetail, styles);
