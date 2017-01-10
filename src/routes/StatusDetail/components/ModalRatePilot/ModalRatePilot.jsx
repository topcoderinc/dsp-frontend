import React, {PropTypes, Component} from 'react';
import CSSModules from 'react-css-modules';
import Modal from 'react-modal';
import Button from 'components/Button';
import RatePilotForm from '..//RatePilotForm';
import Spinner from 'components/Spinner';
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

class ModalRatePilot extends Component {
  constructor() {
    super();
    this.state = {
      spinner: {
        open: false,
        content: null,
      },
    };

    this.onRate = this.onRate.bind(this);
    this.removeSpinner = this.removeSpinner.bind(this);
  }

  onRate(values) {
    const {onRate, mission, load, id} = this.props;
    this.setState(
      {
        spinner: {
          open: true,
          content: 'Rating, Please wait...',
          error: false,
        },
      },
      () => onRate(mission.id, values)
        .then(
          () => {
            this.setState({
              spinner: {
                open: true,
                content: 'Success!',
                error: false,
              },
            }, () => {
              load(id);
              this.removeSpinner();
            }
            );
          },
          (res) => {
            this.setState({
              spinner: {
                open: true,
                content: JSON.parse(res.response.text).error,
                error: true,
              },
            }, this.removeSpinner);
          }
        )
    );
  }

  removeSpinner() {
    setTimeout(
      () => this.setState({
        spinner: {
          open: false,
          content: null,
          error: false,
        },
      }), 2500);
  }

  render() {
    const {isOpen, onClose, onOpen, mission} = this.props;

    return (
      <div styleName="modal-rate-pilot">
        <Button onClick={onOpen} color="blue">{mission.review ? 'View Your Rating' : 'Rate now!'}</Button>
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
          <RatePilotForm
            readMode={!!mission.review}
            initialValues={
              mission.review ? {
                rate: mission.review.rating,
                comment: mission.review.publicFeedback,
              } : {
                rate: 0,
                comment: '',
              }
            }
            onSubmit={this.onRate}
            onCloseClick={onClose}
          />
        </Modal>
        <Spinner
          content={this.state.spinner.content}
          isOpen={this.state.spinner.open}
          error={this.state.spinner.error}
        />
      </div>
    );
  }
}

ModalRatePilot.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRate: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  mission: PropTypes.object,
  id: PropTypes.string,
  load: PropTypes.func,
};

export default CSSModules(ModalRatePilot, styles);
