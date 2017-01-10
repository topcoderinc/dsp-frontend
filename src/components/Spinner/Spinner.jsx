import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Modal from 'react-modal';
import styles from './Spinner.scss';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(9, 9, 9, 0.58)',
    zIndex: '9999',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    minWidth: '217px',
    textAlign: 'center',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '20px',
    zIndex: '99999',
  },
};

const Spinner = ({content, isOpen, error}) => (
  <Modal
    style={customStyles}
    isOpen={isOpen}
    shouldCloseOnOverlayClick={false}
    contentLabel="Spinner"
  >
    <div styleName={error ? 'error' : ''}>
      {content}
    </div>
  </Modal>
  );

Spinner.propTypes = {
  content: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  error: PropTypes.bool,
};

export default CSSModules(Spinner, styles);
