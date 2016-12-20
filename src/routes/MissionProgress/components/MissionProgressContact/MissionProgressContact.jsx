import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './MissionProgressContact.scss';


/*
* MissionProgressContact
*/

export const MissionProgressContact = ({contactInfo}) => (
  <div styleName="customer-contact-details">
    <div styleName="title">Customer Contact Info</div>
    <div styleName="customer-info">
      <div styleName="user-picture" />
      <div styleName="">
        <div styleName="data-row">
          <div styleName="lable">Name:</div>
          <div styleName="value">{contactInfo.name}</div>
        </div>
        {/* data-row end */}
        <div styleName="data-row">
          <div styleName="lable">Address:</div>
          <div styleName="value">{contactInfo.address.streetAddress}<br />
            {contactInfo.address.city}, {contactInfo.address.State} {contactInfo.address.zip}</div>
        </div>
        {/* data-row end */}
        <div styleName="data-row">
          <div styleName="lable">Phone:</div>
          <div styleName="value">{contactInfo.phoneNum}</div>
        </div>
        {/* data-row end */}
        <div styleName="data-row">
          <div styleName="lable">Email:</div>
          <div styleName="value">{contactInfo.email}</div>
        </div>
        {/* data-row end */}
      </div>
    </div>
    {/* customer-info end */}
  </div>
);

MissionProgressContact.propTypes = {
  contactInfo: PropTypes.object.isRequired,
};

export default CSSModules(MissionProgressContact, styles);
