import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Button from 'components/Button';
import styles from './ModalConfirm.scss';
import Modal from 'react-modal';


/*
* customStyles
*/

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(9, 9, 9, 0.58)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
    width: '633px',
  },
};


/*
* ModalConfirm
*/


const ModalConfirm = ({isOpen, onClose, onConfirm, title, message}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    style={customStyles}
    contentLabel="Example Modal"
  >
    <div styleName="modal-header">
      <div styleName="title">{title}</div>
      <div onClick={onClose} styleName="icon-close-modal" />
    </div>
    <p styleName="modal-msg">{message}</p>
    <div styleName="actions">
      <Button
        color="black" onClick={onClose}
        className={styles.btnCacnel}
      >Cancel</Button>
      <Button
        color="red" onClick={onConfirm}
        className={styles.btnConfirm}
      >Delete</Button>
    </div>
  </Modal>
);

ModalConfirm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default CSSModules(ModalConfirm, styles);
