import React, {PropTypes, Component} from 'react';
import CSSModules from 'react-css-modules';
import Modal from 'react-modal';
import AssignDrone from '../AssignDrone';
import Spinner from 'components/Spinner';
import styles from './RequestItemControls.scss';

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
    width: '620px',
    textAlign: 'center',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '20px',
    zIndex: '99999',
    padding: '20px 0',
  },
};

class RequestItemControls extends Component {
  constructor() {
    super();

    this.state = {
      modal: {
        open: null,
      },
      drones: [],
      selectedDroneId: null,
      spinner: {
        isOpen: false,
        error: false,
        content: null,
      },
    };

    this.clickAccept = this.clickAccept.bind(this);
    this.clickReject = this.clickReject.bind(this);
    this.clickAssign = this.clickAssign.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.confirmAssign = this.confirmAssign.bind(this);
    this.afterSelect = this.afterSelect.bind(this);
    this.handleError = this.handleError.bind(this);
    this.reject = this.reject.bind(this);
  }

  clickAccept() {
    const {getDrones} = this.props;

    this.setState({
      spinner: {
        isOpen: true,
        content: 'Please Wait...',
        error: false,
      },
    }, () => {
      getDrones().then(({items}) => {
        this.setState({
          spinner: {
            isOpen: false,
          },
        });
        this.setState({
          modal: {
            open: 'assignDrone',
          },
          drones: items,
        });
      })
      .catch(this.handleError);
    });
  }

  handleError(error) {
    this.setState({
      spinner: {
        isOpen: true,
        content: JSON.parse(error.response.text).error,
        error: true,
      },
      modal: {
        open: null,
      },
    }, () => {
      setTimeout(() => {
        this.setState({
          spinner: {
            isOpen: false,
          },
        });
      }, 2000);
    });
  }

  clickReject() {
    this.setState({
      modal: {
        open: 'rejectConfirm',
      },
    });
  }

  confirmAssign() {
    this.setState({
      modal: {
        open: 'assignConfirm',
      },
    });
  }

  clickAssign() {
    const {assignDrone} = this.props;
    this.setState({
      spinner: {
        isOpen: true,
        content: 'Please Wait...',
        error: false,
      },
    }, () => {
      assignDrone(this.state.selectedDroneId)
        .then(() => {
          this.setState({
            spinner: {
              isOpen: false,
            },
            modal: {
              open: null,
            },
          });
        })
        .catch(this.handleError);
    });
  }

  reject() {
    const {rejectRequest} = this.props;

    this.setState({
      spinner: {
        isOpen: true,
        content: 'Please Wait...',
        error: false,
      },
    }, () => {
      rejectRequest(this.state.selectedDroneId)
      .then(() => {
        this.setState({
          spinner: {
            isOpen: false,
          },
          modal: {
            open: null,
          },
        });
      })
      .catch(this.handleError);
    });
  }

  closeModal() {
    this.setState({
      modal: {
        open: null,
      },
    });
  }

  afterSelect(i) {
    this.setState({
      selectedDroneId: this.state.drones[i].id,
    });
  }

  render() {
    const {_toggleDetail, isOpen, index, currentStatus} = this.props;

    return (
      <div styleName="item-controls">
        <div styleName={isOpen ? 'view-detail-open' : 'view-detail'} onClick={() => _toggleDetail(index)}>View Detail</div>
        {
          currentStatus === 'pending' ?
          (
            <div styleName="accept" onClick={this.clickAccept}>Accept</div>
          ) : null
        }
        {
          currentStatus === 'pending' ?
          (
            <div styleName="reject" onClick={this.clickReject}>Reject</div>
          ) : null
        }
        {
          currentStatus === 'pending' ?
          (
            <div>
              <AssignDrone
                isOpen={this.state.modal.open === 'assignDrone'}
                closeModal={this.closeModal}
                drones={this.state.drones}
                confirmAssign={this.confirmAssign}
                afterSelect={this.afterSelect}
              />
              <Modal
                isOpen={this.state.modal.open === 'assignConfirm' || this.state.modal.open === 'rejectConfirm'}
                style={customStyles}
                contentLabel="confirm-action"
              >
                <div styleName="modal-body">
                  {
                    this.state.modal.open === 'assignConfirm' ?
                      'Do you really want to assign drone to this request?' :
                      'Do you really want to reject this request?'
                  }
                </div>
                <div styleName="modal-btns">
                  <div styleName="btn cancel" onClick={this.closeModal}>Cancel</div>
                  <div styleName="btn confirm" onClick={this.state.modal.open === 'assignConfirm' ? this.clickAssign : this.reject}>Confirm</div>
                </div>
              </Modal>
            </div>
          ) : null
        }
        <Spinner
          isOpen={this.state.spinner.isOpen}
          content={this.state.spinner.content}
          error={this.state.spinner.error}
        />
      </div>
    );
  }
}
RequestItemControls.propTypes = {
  _toggleDetail: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  currentStatus: PropTypes.string.isRequired,
  getDrones: PropTypes.func.isRequired,
  assignDrone: PropTypes.func.isRequired,
  rejectRequest: PropTypes.func.isRequired,
};

export default CSSModules(RequestItemControls, styles, {allowMultiple: true});
