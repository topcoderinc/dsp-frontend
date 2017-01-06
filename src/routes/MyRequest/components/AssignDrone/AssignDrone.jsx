import React, {PropTypes, Component} from 'react';
import CSSModules from 'react-css-modules';
import cn from 'classnames';
import Modal from 'react-modal';
import styles from './AssignDrone.scss';

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
    width: '450px',
    height: '500px',
    textAlign: 'center',
    borderRadius: '5px',
    fontWeight: 'bold',
    fontSize: '20px',
    zIndex: '99999',
    padding: '0',
  },
};

class AssignDrone extends Component {
  constructor() {
    super();

    this.state = {
      selectedDrone: null,
    };
    this.selectDrone = this.selectDrone.bind(this);
  }

  selectDrone(i) {
    const {afterSelect} = this.props;

    this.setState({
      selectedDrone: i,
    }, () => afterSelect(i));
  }

  render() {
    const {drones, isOpen, closeModal, confirmAssign} = this.props;
    return (
      <div>
        <Modal style={customStyles} isOpen={isOpen} contentLabel="assign-drone">
          <div onClick={closeModal} styleName="icon-close" />
          <div styleName="title">
            Assign drone for the mission
          </div>
          <div styleName="body">
            {
              (drones && drones.length > 0) ?
              (
                <ul>
                  {
                    drones.map((d, i) => (
                      <li key={i} onClick={() => this.selectDrone(i)} styleName={this.state.selectedDrone === i ? 'selected' : null}>
                        {d.name}
                      </li>
                      )
                    )
                  }
                </ul>
              ) :
              (
                <div styleName="no-drones">
                  No available drones for now!
                </div>
              )
            }
          </div>
          <div styleName="foot">
            <div
              styleName={cn({'btn-confirm': true, disabled: this.state.selectedDrone === null})} onClick={
              () => {
                if (this.state.selectedDrone !== null) {
                  confirmAssign();
                }
              }
            }
            >Confirm</div>
          </div>
        </Modal>
      </div>
    );
  }
}

AssignDrone.propTypes = {
  afterSelect: PropTypes.func,
  drones: PropTypes.array,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func,
  confirmAssign: PropTypes.func,
};

export default CSSModules(AssignDrone, styles, {allowMultiple: true});
