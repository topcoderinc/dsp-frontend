import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {reduxForm} from 'redux-form';
import cn from 'classnames';
import Modal from 'react-modal';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import TextField from 'components/TextField';
import styles from './LoginModal.scss';
import APIService from '../../../../services/APIService';
import {toastr} from 'react-redux-toastr';
import {defaultAuth0Service} from '../../../../services/AuthService';

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

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
const FormField = ({error, touched, children}) => (
  <div className={cn('form-field', {error: error && touched})}>
    {children}
    {error && touched && <div className="error-message">{error}</div>}
  </div>
);
FormField.propTypes = {
  error: PropTypes.string,
  touched: PropTypes.bool,
  children: PropTypes.any,
};

/*
* LogInModal
*/

class LogInModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalLoginIsOpen: false,
      showForgetPassword: false,
    };
  }

  openLoginModal() {
    this.setState({modalLoginIsOpen: true});
  }

  closeLoginModal() {
    this.setState({modalLoginIsOpen: false, showForgetPassword: false});
  }

  login() {
    this.setState({modalLoginIsOpen: true});
  }

  handleLogin(handleLoggedIn, loggedUser) {
    const _self = this;
    setTimeout(() => {
      handleLoggedIn();
      if (loggedUser) {
        _self.setState({modalLoginIsOpen: false});
        _self.setState({modalSignupIsOpen: false});
      }
    }, 100);
  }

  forgetPassword() {
    this.setState({showForgetPassword: true});
  }

  /**
   * Login using google social network,
   * this method internally uses auth0 service
   */
  googleLogin() {
    defaultAuth0Service.login({connection: 'google-oauth2'}, (error) => {
      if (error) {
        const message = error.message || 'something went wrong, please try again';
        toastr.error(message);
      }
    });
  }

  /**
   * Login using facebook social network,
   * this method internally uses auth0 service
   */
  facebookLogin() {
    defaultAuth0Service.login({connection: 'facebook'}, (error) => {
      if (error) {
        const message = error.message || 'something went wrong, please try again';
        toastr.error(message);
      }
    });
  }

  /**
   * This method is invoked when reset password request is submitted
   */
  handleForgetPassword(data) {
    APIService.forgotPassword({email: data.emailUp}).then(() => {
      toastr.success('', 'Reset password link emailed to your email address');
      this.closeLoginModal();
    }).catch((reason) => {
      const message = reason.response.body.error || 'something went wrong, please try again';
      toastr.error(message);
      this.closeLoginModal();
    });
  }

  render() {
    const _self = this;
    const {handleSubmit, fields, handleLoggedIn, loggedUser, hasError, errorText} = this.props;
    return (
      <div styleName="signin-modal">
        <div styleName="login-signup">
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
            {this.state.showForgetPassword === false && <div styleName="title">Login to Your Account</div>}
            {this.state.showForgetPassword === true && <div styleName="title">Reset forgotten password</div>}
          </div>
          {this.state.showForgetPassword === false &&
            <form styleName="login-form" onSubmit={handleSubmit}>
              <div styleName="login-with-fb">
                <a href="javascript:;" onClick={this.facebookLogin.bind(this)}>
                  <i styleName="icon-facebook" />
                  <span>Log In with Facebook</span>
                </a>
              </div>

              <div styleName="login-with-gplus">
                <a href="javascript:;" onClick={this.googleLogin.bind(this)}>
                  <i styleName="icon-gplus" />
                  <span>Log In with Google Plus</span>
                </a>
              </div>
              {/* login with end */}
              <div styleName="or-border">
                <div styleName="left-line" />
                <div styleName="or">or</div>
                <div styleName="right-line" />
              </div>
              {/* or end */}
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
              {/* input end */}
              <div styleName="rem-forget">
                <div styleName="rem-checkbox">
                  <Checkbox
                    checked={!this.props.fields.remember.value}
                    onChange={() => this.props.fields.remember.onChange(!this.props.fields.remember.value)}
                    id="remember"
                  >
                    Remember me
                  </Checkbox>
                </div>
                <div styleName="forget"><a href="javascript:;" onClick={this.forgetPassword.bind(this)}>Forget Password?</a></div>
              </div>
              <div styleName="login-btn">
                <Button
                  type="submit" color="black"
                  className={styles.btnLogin} onClick={() => this.handleLogin(handleLoggedIn, loggedUser)}
                >
                  Log In
                </Button>
              </div>
              <div styleName="dont-have">
                Don&#8217;t have an account? <a href="javascript:;" className="singup">Sign Up</a>
              </div>
            </form>
          }
          { this.state.showForgetPassword === true &&
            <form styleName="login-form" onSubmit={handleSubmit((data) => _self.handleForgetPassword(data))}>
              <div>
                {hasError && <span className="error-msg">{errorText.error}</span>}
                <div styleName="email-input">
                  <FormField {...fields.emailUp}>
                    <TextField {...fields.emailUp} login type="email" label="Email" />
                  </FormField>
                </div>
              </div>
              <div styleName="login-btn">
                <Button type="submit" color="black" className={styles.btnLogin}>
                  Reset Password
                </Button>
              </div>
            </form>
          }
        </Modal>
      </div>
    );
  }
}

LogInModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object,
  handleLoggedIn: PropTypes.func.isRequired,
  loggedUser: PropTypes.bool,
  hasError: PropTypes.bool,
  errorText: PropTypes.string,
};

const fields = ['remember', 'email', 'password', 'emailUp', 'passwordUp'];

const validate = (values) => {
  const errors = {};
  if (!values.emailUp && !values.email) {
    errors.emailUp = 'Email is required';
  } else if (!EMAIL_REGEX.test(values.emailUp) && !values.email) {
    errors.emailUp = 'Invalid email address';
  }

  if (errors.emailUp && (values.emailUp || values.email)) {
    return errors;
  } else if (values.emailUp) {
    return errors;
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};


export default reduxForm({form: 'loginForm', fields, validate})(CSSModules(LogInModal, styles));
