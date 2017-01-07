import React, {PropTypes, Component} from 'react';
import CSSModules from 'react-css-modules';
import Button from 'components/Button';
import {browserHistory} from 'react-router';
import ModalConfirm from 'components/ModalConfirm';
import styles from './DroneDetailsHeader.scss';

/*
* DroneDetailsHeader
*/

export class DroneDetailsHeader extends Component {
  constructor(props) {
    super(props);

    this.openModalConfirm = this.openModalConfirm.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);

    this.state = {
      modalIsOpen: false,
    };
  }

  openModalConfirm() {
    this.setState({modalIsOpen: true});
  }

  handleCloseModal() {
    this.setState({modalIsOpen: false});
  }

  handleConfirmClick() {
    this.props.deleteDrone(this.props.drone.id);
    this.setState({modalIsOpen: false});
  }

  render() {
    const {drone} = this.props;

    return (
      <div styleName="drone-details-header">
        <div styleName="title">Drone Details</div>
        <div styleName="add-drone-btn">
          <Button color="blue" className={styles.btnDeleteDrone} onClick={this.openModalConfirm}>Delete Drone</Button>
          <Button
            color="blue" className={styles.btnEditDrone} onClick={() => {
              browserHistory.push(`/edit-drones/${drone.id}`);
            }}
          >Edit Drone</Button>
        </div>
        <ModalConfirm
          title="Confirm drone deleting"
          message="Are you sure you want to delete this drone?"
          isOpen={this.state.modalIsOpen}
          onClose={this.handleCloseModal}
          onConfirm={this.handleConfirmClick}
        />
      </div>
    );
  }
}


DroneDetailsHeader.propTypes = {
  drone: PropTypes.object.isRequired,
  deleteDrone: PropTypes.func.isRequired,
};

export default CSSModules(DroneDetailsHeader, styles);
