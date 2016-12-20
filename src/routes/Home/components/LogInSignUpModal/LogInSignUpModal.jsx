import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link, browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import Modal from 'react-modal';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import TextField from 'components/TextField';
import styles from './LogInSignUpModal.scss';
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
* LogInSignUpModal
*/

class LogInSignUpModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modalLoginIsOpen: false,
      modalSignupIsOpen: false,
    };
  }

  openLoginModal() {
    this.setState({modalLoginIsOpen: true});
  }
  openSignupModal() {
    this.setState({modalSignupIsOpen: true});
  }

  afterOpenLoginModal() {
  }
  afterOpenSignupModal() {
  }

  closeLoginModal() {
    this.setState({modalLoginIsOpen: false});
  }
  closeSignupModal() {
    this.setState({modalSignupIsOpen: false});
  }

  login(email, pass) {
    this.setState({modalSignupIsOpen: false});
    this.setState({modalLoginIsOpen: true});
  }

  handleLogin(handleLoggedIn, loggedUser) {
    handleLoggedIn();
    const _self = this;
    setTimeout(() => {
      handleLoggedIn();
      if (loggedUser) {
        _self.setState({modalLoginIsOpen: false});
        _self.setState({modalSignupIsOpen: false});
      }
    }, 100);
  }

  handleSignup() {
    userApi.register('first', 'provider2@qq.com', '123456').then((authResult) => {
      console.log(authResult);
      browserHistory.push('/browse-provider');
    }).catch((err) => {
      console.log(err.responseText);
    });
  }

  signUp() {
    this.setState({modalLoginIsOpen: false});
    this.setState({modalSignupIsOpen: true});
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, fields, handleLoggedIn, loggedUser, hasError, errorText } = this.props;

    return (
      <div styleName="signin-modal">
        <div styleName="login-signup">
          <a href="javascript:" styleName="signup" onClick={this.openSignupModal.bind(this)}>Sign Up</a>
          <a href="javascript:" styleName="login" onClick={this.openLoginModal.bind(this)}>Login</a>
        </div>
        <Modal
          isOpen={this.state.modalLoginIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeLoginModal.bind(this)}
          style={customStyles}
          shouldCloseOnOverlayClick
          contentLabel="Login Modal"
        >

          <div styleName="modal-header">
            <div onClick={this.closeLoginModal.bind(this)} styleName="icon-close-modal" />
            <div styleName="title">Login to Your Account</div>
          </div>

          <form styleName="login-form" onSubmit={handleSubmit}>
            <div styleName="login-with-fb">
              <a href="javascript:;">
                <i styleName="icon-facebook" />
                <span>Log In with Facebook</span>
              </a>
            </div>

            <div styleName="login-with-gplus">
              <a href="javascript:;">
                <i styleName="icon-gplus" />
                <span>Log In with Google Plus</span>
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
            <div styleName="rem-forget">
              <div styleName="rem-checkbox">
                <Checkbox
                  checked={this.props.fields.remember.value != true}
                  onChange={() => this.props.fields.remember.onChange(!this.props.fields.remember.value)}
                  id="remember"
                >
                  Remember me
                </Checkbox>
              </div>
              <div styleName="forget"><a href="javascript:;">Forget Password?</a></div>
            </div>
            <div styleName="login-btn">
              <Button
                type="submit" color="black"
                className={styles.btnLogin} onClick={(e) => this.handleLogin(handleLoggedIn, loggedUser)}
              >
                Log In
              </Button>
            </div>
            <div styleName="dont-have">
              Don&#8217;t have an account?            <a href="javascript:;" className="singup" onClick={this.signUp.bind(this)}>Sign Up</a>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={this.state.modalSignupIsOpen}
          onAfterOpen={this.afterOpenSignupModal}
          onRequestClose={this.closeSignupModal.bind(this)}
          style={customStyles}
          shouldCloseOnOverlayClick
          contentLabel="Login Modal"
        >

          <div styleName="modal-header">
            <div onClick={this.closeSignupModal.bind(this)} styleName="icon-close-modal" />
            <div styleName="title">Login to Your Account</div>
          </div>

          <form styleName="login-form">
            <div styleName="login-with-fb">
              <a href="javascript:;">
                <i styleName="icon-facebook" />
                <span>Continue  with Facebook</span>
              </a>
            </div>

            <div styleName="login-with-gplus">
              <a href="javascript:;">
                <i styleName="icon-gplus" />
                <span>Continue with Google Plus</span>
              </a>
            </div>
            {/* login with end*/}
            <div styleName="or-border">
              <div styleName="left-line" />
              <div styleName="or">or</div>
              <div styleName="right-line" />
            </div>
            {/* or end*/}

            <div styleName="signup-btn">
              <i styleName="icon-email" />

              <Button color="black" className={styles.btnLogin} onClick={this.handleSignup.bind(this)}>
                Sign up with Email
              </Button>

            </div>
            {/* signup-btn end*/}
            <div styleName="by-signup">
              By signing up, I agree to Drone Market’s
              <a href="javascript:;">terms of service</a>, <a href="javascript:;">privacy policy</a>,
              and <a href="javascript:;">disclaimer</a>.
            </div>
            {/* by-signup end*/}
            <div styleName="dont-have">
              Already have an account? <a href="javascript:;" className="singup" onClick={this.login.bind(this)}>Log In</a>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

LogInSignUpModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

const fields = ['remember', 'email', 'password', 'emailUp', 'passwordUp'];

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


export default reduxForm({ form: 'loginForm', fields, validate })(CSSModules(LogInSignUpModal, styles));
