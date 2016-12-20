import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link, browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import Modal from 'react-modal';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import TextField from 'components/TextField';
import styles from './SignupModal.scss';
const { DOM: { input } } = React;

import UserApi from 'api/User.js';
const config = require('../../../../config');
const userApi = new UserApi(config.default.api.basePath);

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
    width: '417px',
    borderRadius: '10px',
    zIndex: '99999',
  },
};
const FormField = ({label, error, touched, children}) => (
  <div className={cn('form-field', {error: error && touched})}>
    {children}
    {error && touched && <div className="error-message">{error}</div>}
  </div>
);
/*
* SignupModal
*/

class SignupModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modalSignupIsOpen: false
    };
  }

  openSignupModal() {
    this.setState({modalSignupIsOpen: true});
  }

  afterOpenSignupModal() {
  }

  closeSignupModal() {
    this.setState({modalSignupIsOpen: false});
  }

  signup(email, pass) {
    this.setState({modalSignupIsOpen: true});
  }

  handleSignup(handleSigned, signedUser) {
    handleSigned();
    const _self = this;
    setTimeout(() => {
      handleSignup();
      if (signedUser) {
        _self.setState({modalSignupIsOpen: false});
      }
    }, 100);
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, fields, handleSigned, signedUser, hasError, errorText } = this.props;

    return (
      <div styleName="signin-modal">
        <div styleName="login-signup">
          <a href="javascript:" styleName="login" onClick={this.openSignupModal.bind(this)}>Sign Up</a>
        </div>
        <Modal
          isOpen={this.state.modalSignupIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeSignupModal.bind(this)}
          style={customStyles}
          shouldCloseOnOverlayClick
          contentLabel="Signup Modal"
        >

          <div styleName="modal-header">
            <div onClick={this.closeSignupModal.bind(this)} styleName="icon-close-modal" />
            <div styleName="title">Create new Account</div>
          </div>

          <form styleName="login-form" onSubmit={handleSubmit}>
            <div styleName="login-with-fb">
              <a href="javascript:;">
                <i styleName="icon-facebook" />
                <span>Sign Up with Facebook</span>
              </a>
            </div>

            <div styleName="login-with-gplus">
              <a href="javascript:;">
                <i styleName="icon-gplus" />
                <span>Sign Up with Google Plus</span>
              </a>
            </div>
            {/* login with end*/}
            <div styleName="or-border">
              <div styleName="left-line" />
              <div styleName="or">or</div>
              <div styleName="right-line" />
            </div>
            {/* or end*/}
            <div>
              {hasError && <span className="error-msg">{errorText.error}</span>}
              <div styleName="email-input">
                <FormField {...fields.email}>
                  <TextField {...fields.email} login type="email" label="Email" />
                </FormField>
              </div>
              <div>
                <FormField {...fields.password}>
                  <TextField {...fields.password} login type="password" label="Password" />
                </FormField>
              </div>
            </div>
            {/* input end*/}
            
            <div styleName="login-btn">
              <Button
                type="submit" color="black"
                className={styles.btnLogin} onClick={(e) => this.handleSignup(handleSigned, signedUser)}
              >
                Sign Up
              </Button>
            </div>
            <div styleName="dont-have">
              Don&#8217;t have an account?            <a href="javascript:;" className="singup" >Log In</a>
            </div>
          </form>
        </Modal>

        
      </div>
    );
  }
}

SignupModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const fields = ['email', 'password', 'emailUp', 'passwordUp'];

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};


export default reduxForm({ form: 'signupForm', fields, validate })(CSSModules(SignupModal, styles));
