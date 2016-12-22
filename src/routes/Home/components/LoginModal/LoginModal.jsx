import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {reduxForm} from 'redux-form';
import cn from 'classnames';
import Modal from 'react-modal';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import TextField from 'components/TextField';
import styles from './LoginModal.scss';
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
  error: PropTypes.bool,
  touched: PropTypes.bool,
  children: PropTypes.any,
};

/*
* LogInModal
*/

class LogInModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modalLoginIsOpen: false,
    };
  }

  openLoginModal() {
    this.setState({modalLoginIsOpen: true});
  }

  closeLoginModal() {
    this.setState({modalLoginIsOpen: false});
  }

  login() {
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

  render() {
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
              <div styleName="forget"><a href="javascript:;">Forget Password?</a></div>
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
              Don&#8217;t have an account? <a href="javascript:;" className="singup" >Sign Up</a>
            </div>
          </form>
        </Modal>


      </div>
    );
  }
}

LogInModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object,
  handleLoggedIn: PropTypes.func.isRequired,
  loggedUser: PropTypes.object,
  hasError: PropTypes.bool,
  errorText: PropTypes.string.isRequired,
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


export default reduxForm({form: 'loginForm', fields, validate})(CSSModules(LogInModal, styles));
