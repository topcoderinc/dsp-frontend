import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {Link} from 'react-router';
import Button from 'components/Button';
import styles from './MissionMarkAsModal.scss';
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
* MissionMarkAsModal
*/


class MissionMarkAsModal extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  markAsComplete() {
    this.setState({modalIsOpen: false});
    this.props.handleStatus('Completed');
  }

  render() {
    const {statusName} = this.props;
    return (
      <div styleName="mark-as-modal">
        {statusName !== 'Completed' ? (
          <Button
            color="blue" onClick={this.openModal.bind(this)}
            className={styles.btnAsComplete}
          >Mark Mission as Complete</Button>
        ) : (

          <Link to="edit-data">
            <Button color="blue" className={styles.btnAsComplete}>Edit Telemetry Data</Button>
          </Link>
        )}

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal.bind(this)}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div styleName="modal-header">
            <div styleName="title">Mark Mission As Complete</div>
            <div onClick={this.closeModal.bind(this)} styleName="icon-close-modal" />
          </div>
          <p styleName="modal-msg">Are you sure you want to mark this mission as complete?</p>
          <div styleName="mark-as-btns">
            <Button
              color="black" onClick={this.closeModal.bind(this)}
              className={styles.btnOk}
            >OK</Button>
            <Button
              color="blue" onClick={this.markAsComplete.bind(this)}
              className={styles.btnMarkComplete}
            >Mark Complete</Button>
          </div>
        </Modal>
      </div>
    );
  }
}

MissionMarkAsModal.propTypes = {
  statusName: PropTypes.string.isRequired,
  handleStatus: PropTypes.func.isRequired,
};

export default CSSModules(MissionMarkAsModal, styles);
