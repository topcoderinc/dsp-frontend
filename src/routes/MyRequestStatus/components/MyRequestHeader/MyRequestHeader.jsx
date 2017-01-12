import React, {PropTypes, Component} from 'react';
import CSSModules from 'react-css-modules';
import Modal from 'react-modal';
import {browserHistory} from 'react-router';
import SelectDropdown from 'components/SelectDropdown';
import Button from 'components/Button';
import styles from './MyRequestHeader.scss';

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
    padding: '0px',
    width: '417px',
    borderRadius: '10px',
    zIndex: '99999',
    border: 'none',
  },
};

class MyRequestHeader extends Component {
  constructor() {
    super();

    this.state = {
      openModal: false,
    };

    this.clickCreate = this.clickCreate.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.selectPackage = this.selectPackage.bind(this);
    this.confirmPackage = this.confirmPackage.bind(this);
  }

  clickCreate() {
    const {searchPackages} = this.props;
    this.setState({
      openModal: true,
    }, () => {
      searchPackages().then(() => {
        this.setState({
          searchError: false,
        });
      }).catch(() => {
        this.setState({
          searchError: true,
        });
      });
    });
  }

  closeModal() {
    this.setState({
      openModal: false,
    });
  }

  selectPackage(i) {
    this.setState({
      selectedPackage: i,
    });
  }

  confirmPackage() {
    const {availablePackages} = this.props;
    this.setState({
      openModal: false,
    }, () => {
      browserHistory.push(`/service-request/${availablePackages[this.state.selectedPackage].id}`);
    });
  }

  render() {
    const {onStatusChange, statusValue, availablePackages} = this.props;
    return (
      <div styleName="my-request-header">
        <h1 styleName="title">My Request Status</h1>
        <div styleName="right-group">
          <Button className={styles['create-btn']} onClick={this.clickCreate}>
            Create Request
          </Button>
          <SelectDropdown
            options={[
              {value: 'all', label: 'Show all requests'},
              {value: 'in-progress', label: 'Show In Progress'},
              {value: 'cancelled', label: 'Show Cancelled'},
              {value: 'completed', label: 'Show Completed'},
              {value: 'rejected', label: 'Show Rejected'},
              {value: 'pending', label: 'Show Pending'},
              {value: 'scheduled', label: 'Show Scheduled'},
            ]}
            value={statusValue}
            onChange={onStatusChange}
          />
        </div>
        <Modal
          isOpen={this.state.openModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          shouldCloseOnOverlayClick
          contentLabel='available-pacages'
        >
          <div styleName="modal-wrap">
            <div styleName="modal-title">
              Select a package
            </div>
            <div styleName="modal-body">
              {
                availablePackages.length > 0 ?
                  (
                    <ul>
                      {
                        availablePackages.map((p, i) => (
                          <li
                            key={i}
                            onClick={() => this.selectPackage(i)}
                            styleName={this.state.selectedPackage === i ? 'selected' : null}
                          >
                            {p.name}
                          </li>
                        ))
                      }
                    </ul>
                  ) :
                  (
                    <div styleName={this.state.searchError ? 'error' : null}>
                      {
                        this.state.searchError ?
                          'An error occured when searching packages' :
                          'No available packages for now.'
                      }
                    </div>
                  )
              }
            </div>
            {
              availablePackages.length > 0 ?
              (
                <div styleName="modal-foot">
                  <Button onClick={this.confirmPackage}>
                    Confirm
                  </Button>
                </div>
              ) : null
            }
          </div>
        </Modal>
      </div>
    );
  }
}

MyRequestHeader.propTypes = {
  onStatusChange: PropTypes.func.isRequired,
  statusValue: PropTypes.string.isRequired,
  availablePackages: PropTypes.array.isRequired,
  searchPackages: PropTypes.func.isRequired,
};

export default CSSModules(MyRequestHeader, styles);
