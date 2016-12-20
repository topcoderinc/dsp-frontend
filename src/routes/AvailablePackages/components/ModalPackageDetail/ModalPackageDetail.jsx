import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import Button from 'components/Button';
import styles from './ModalPackageDetail.scss';

const Modal = require('react-modal');

{
/*
* customStyles
*/
}
const customStyles = {
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(9, 9, 9, 0.0)',
    zIndex: 999,
  },
  content: {
    top: '5vh',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%)',
    padding: '0px',
    width: '895px',
  },
};

/*
* ModalPackageDetail
*/

const getImage = (name) => `${window.location.origin}/img/drones/${name}`;

const ModalPackageDetail = React.createClass({

  getInitialState() {
    return { modalIsOpen: false };
  },

  openModal() {
    this.setState({modalIsOpen: true});
  },

  afterOpenModal() {
  },

  closeModal() {
    this.setState({modalIsOpen: false});
  },
  markAsComplete() {
    this.setState({modalIsOpen: false});
    this.props.handleStatus('Completed');
  },

  render() {
    return (
      <div styleName="package-detail-modal">

        <a href="javascript:;" styleName="view-btn" onClick={this.openModal}>View Samples</a>
        {this.state.modalIsOpen && <div styleName="overlay-bg" />}
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div styleName="overlay-bg" />
          <div styleName="modal-container">
            <div styleName="modal-header">
              <div styleName="title">Package Details</div>
              <div onClick={this.closeModal} styleName="icon-close-modal" />
            </div>
            <div styleName="modal-content">
              <div styleName="drone-thumb">
                <div styleName="drone-video">
                  <img src={getImage('drone-video-thumb.png')} alt="video thumb" />
                  <i styleName="icon-play-video" />
                </div>
                <div styleName="drone-pics">
                  <div styleName="pic-thumb"><img src={getImage('drone-5.png')} alt="video thumb" /></div>
                  <div styleName="pic-thumb"><img src={getImage('drone-6.png')} alt="video thumb" /></div>
                </div>
              </div>

              <div styleName="drone-info">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus
                accumsan et vivez rra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient
                montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien
                nunc eget odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.
                Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores
                legere me lius quod ii legunt saepius.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus
                accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient
                montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien
                nunc eget odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
});

ModalPackageDetail.propTypes = {
};

export default CSSModules(ModalPackageDetail, styles);
