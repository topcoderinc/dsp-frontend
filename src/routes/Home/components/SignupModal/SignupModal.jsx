import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {reduxForm} from 'redux-form';
import cn from 'classnames';
import Modal from 'react-modal';
import Button from 'components/Button';
import TextField from 'components/TextField';
import styles from './SignupModal.scss';
import {defaultAuth0Service} from '../../../../services/AuthService';
import {toastr} from 'react-redux-toastr';

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
* SignupModal
*/

class SignupModal extends React.Component {
  constructor() {
    super();
    this.state = {
      modalSignupIsOpen: false,
    };
  }

  openSignupModal() {
    this.setState({modalSignupIsOpen: true});
  }

  closeSignupModal() {
    this.setState({modalSignupIsOpen: false});
  }

  signup() {
    this.setState({modalSignupIsOpen: true});
  }

  handleSignup(handleSigned, signedUser) {
    handleSigned();
    const _self = this;
    setTimeout(() => {
      if (signedUser) {
        _self.setState({modalSignupIsOpen: false});
      }
    }, 100);
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

  render() {
    const {handleSubmit, fields, handleSigned, signedUser, hasError, errorText} = this.props;

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
              <a href="javascript:;" onClick={this.facebookLogin.bind(this)}>
                <i styleName="icon-facebook" />
                <span>Sign Up with Facebook</span>
              </a>
            </div>

            <div styleName="login-with-gplus">
              <a href="javascript:;" onClick={this.googleLogin.bind(this)}>
                <i styleName="icon-gplus" />
                <span>Sign Up with Google Plus</span>
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
              {hasError && <span className="error-msg">{errorText}</span>}
              <div styleName="email-input">
                <FormField {...fields.email}>
                  <TextField {...fields.email} login type="email" label="Email" />
                </FormField>
              </div>
              <div styleName="email-input">
                <FormField {...fields.firstName}>
                  <TextField {...fields.firstName} login type="text" label="First Name" />
                </FormField>
              </div>
              <div styleName="email-input">
                <FormField {...fields.lastName}>
                  <TextField {...fields.lastName} login type="text" label="lastName" />
                </FormField>
              </div>
              <div>
                <FormField {...fields.password}>
                  <TextField {...fields.password} login type="password" label="Password" />
                </FormField>
              </div>
            </div>
            {/* input end */}

            <div styleName="login-btn">
              <Button
                type="submit" color="black"
                className={styles.btnLogin} onClick={() => this.handleSignup(handleSigned, signedUser)}
              >
                Sign Up
              </Button>
            </div>
            <div styleName="dont-have">
              Don&#8217;t have an account? <a href="javascript:;" className="singup" >Log In</a>
            </div>
          </form>
        </Modal>


      </div>
    );
  }
}

SignupModal.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object,
  handleSigned: PropTypes.func.isRequired,
  signedUser: PropTypes.object,
  hasError: PropTypes.bool,
  errorText: PropTypes.string,
};

const fields = ['email', 'password', 'firstName', 'lastName', 'emailUp', 'passwordUp'];

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.firstName) {
    errors.firstName = 'First Name is required';
  }
  if (!values.lastName) {
    errors.lastName = 'Last Name is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }
  return errors;
};


export default reduxForm({form: 'signupForm', fields, validate})(CSSModules(SignupModal, styles));
