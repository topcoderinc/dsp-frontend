import React from 'react';
import Modal from 'react-modal';
import CSSModules from 'react-css-modules';
import styles from './CheckStatus.scss';

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
    width: '900px',
    borderRadius: '10px',
    zIndex: '99999',
    overflow: 'auto',
    height: '500px',
  },
};

const CheckStatus = ({modalOpen, droneStatus, closeModal}) => (
  <Modal
    isOpen={modalOpen}
    contentLabel="Check Status"
    style={customStyles}
    onRequestClose={closeModal}
    shouldCloseOnOverlayClick
  >
    <div styleName="modal-header">
      <div onClick={closeModal} styleName="icon-close-modal" />
      <div styleName="title">Mission Drone Status</div>
    </div>
    <div styleName="modal-body">
      <div styleName="content-wrapper">
        <div styleName="left-col">
          <div styleName="content">
            <p styleName="content-heading">Current Position</p>
            <div styleName="row">
              <div styleName="left">Time boot (ms)</div>
              <div styleName="right">: {droneStatus.currentPosition.time_boot_ms}</div>
            </div>
            <div styleName="row">
              <div styleName="left">Latitude</div>
              <div styleName="right">: {droneStatus.currentPosition.lat}</div>
            </div>
            <div styleName="row">
              <div styleName="left">Longitude</div>
              <div styleName="right">: {droneStatus.currentPosition.lon}</div>
            </div>
            <div styleName="row">
              <div styleName="left">Altitude</div>
              <div styleName="right">: {droneStatus.currentPosition.alt}</div>
            </div>
            <div styleName="row">
              <div styleName="left">Relative Altitude</div>
              <div styleName="right">: {droneStatus.currentPosition.relative_alt}</div>
            </div>
            <div styleName="row">
              <div styleName="left">vx</div>
              <div styleName="right">: {droneStatus.currentPosition.vx}</div>
            </div>
            <div styleName="row">
              <div styleName="left">vy</div>
              <div styleName="right">: {droneStatus.currentPosition.vy}</div>
            </div>
            <div styleName="row">
              <div styleName="left">vz</div>
              <div styleName="right">: {droneStatus.currentPosition.vz}</div>
            </div>
            <div styleName="row">
              <div styleName="left">hdg</div>
              <div styleName="right">: {droneStatus.currentPosition.hdg}</div>
            </div>
          </div>
        </div>
        <div styleName="right-col">
          <div styleName="content">
            <p styleName="content-heading">Mission Waypoints</p>
            {droneStatus.waypoints.map((point, pi) => (
              <div styleName="point" key={pi}>
                <div styleName="row">
                  <div styleName="left">Latitude</div>
                  <div styleName="right">: {point.y}</div>
                </div>
                <div styleName="row">
                  <div styleName="left">Longitude</div>
                  <div styleName="right">: {point.x}</div>
                </div>
                <div styleName="row">
                  <div styleName="left">Altitude</div>
                  <div styleName="right">: {point.z}</div>
                </div>
                <div styleName="row">
                  <div styleName="left">Param1</div>
                  <div styleName="right">: {point.param1}</div>
                </div>
                <div styleName="row">
                  <div styleName="left">Param2</div>
                  <div styleName="right">: {point.param2}</div>
                </div>
                <div styleName="row">
                  <div styleName="left">Param3</div>
                  <div styleName="right">: {point.param3}</div>
                </div>
                <div styleName="row">
                  <div styleName="left">Param4</div>
                  <div styleName="right">: {point.param4}</div>
                </div>
                <div styleName="row">
                  <div styleName="left">Command</div>
                  <div styleName="right">: {point.command}</div>
                </div>
                <div styleName="row">
                  <div styleName="left">Frame</div>
                  <div styleName="right">: {point.frame}</div>
                </div>
              </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  </Modal>
);

CheckStatus.propTypes = {
  modalOpen: React.PropTypes.bool.isRequired,
  droneStatus: React.PropTypes.object.isRequired,
  closeModal: React.PropTypes.func.isRequired,
};

export default CSSModules(CheckStatus, styles);
