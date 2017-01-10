import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Modal from 'react-modal';
import styles from './ServiceRequestView.scss';
import ProviderMapContainer from '../containers/ProviderMapContainer';
import ServiceDetailContainer from '../containers/ServiceDetailContainer';

/*
* ServiceRequestView
*/

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(9, 9, 9, 0.58)',
    zIndex: '999',
  },
  content: {
    display: 'none',
  },
};

export const ServiceRequestView = ({cancelSelectAddress, selectingAddress, startLocation, endLocation}) => (
  <div>
    <div styleName="service-request-view">
      <div styleName="left-col">
        <ServiceDetailContainer />
      </div>
      <div styleName="right-col">
        <ProviderMapContainer selectingAddress={selectingAddress} startLocation={startLocation} endLocation={endLocation} />
      </div>
    </div>
    <Modal
      isOpen={!!selectingAddress}
      style={customStyles}
      shouldCloseOnOverlayClick
      onRequestClose={cancelSelectAddress}
      contentLabel="select address"
    >
      a modal
    </Modal>
  </div>
);

ServiceRequestView.propTypes = {
  cancelSelectAddress: PropTypes.func.isRequired,
  selectingAddress: PropTypes.string,
  startLocation: PropTypes.object,
  endLocation: PropTypes.object,
};

export default CSSModules(ServiceRequestView, styles);
