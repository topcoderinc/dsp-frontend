import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Modal from 'react-modal';
import Button from 'components/Button';
import RatePilotForm from '..//RatePilotForm';
import styles from './ModalRatePilot.scss';

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(9, 9, 9, 0.55)',
    zIndex: 100,
  },
  content: {
    bottom: 'auto',
    position: 'absolute',
    left: '50%',
    height: 'auto',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '9px',
    outline: 'none',
    padding: 0,
    transform: 'translate(-50%, -50%)',
    top: '50%',
    width: '700px',
  },
};

export const ModalRatePilot = ({isOpen, onClose, onRate, onOpen}) => (
  <div styleName="modal-rate-pilot">
    <Button onClick={onOpen} color="blue">Rate now!</Button>
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenFn}
      onRequestClose={onClose}
      style={modalStyle}
      shouldCloseOnOverlayClick={false}
      contentLabel="Modal"
    >
      <header styleName="header">
        <h2 styleName="title">Rate Your Pilot</h2>
        <button styleName="close" onClick={onClose} />
      </header>
      <RatePilotForm onSubmit={onRate} onCloseClick={onClose} />
    </Modal>
  </div>
);

ModalRatePilot.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRate: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
};

export default CSSModules(ModalRatePilot, styles);
