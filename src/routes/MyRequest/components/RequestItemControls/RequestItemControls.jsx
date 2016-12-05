import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './RequestItemControls.scss';

export const RequestItemControls = ({_toggleDetail, isOpen, index}) => (
  <div styleName="item-controls">
    <div styleName={isOpen ? 'view-detail-open' : 'view-detail'} onClick={() => _toggleDetail(index)}>View Detail</div>
    <div styleName="accept">Accept</div>
    <div styleName="reject">Reject</div>
  </div>
);

RequestItemControls.propTypes = {
  _toggleDetail: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

export default CSSModules(RequestItemControls, styles);
