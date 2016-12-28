import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/ResetPassword';

import ResetPasswordView from '../components/ResetPasswordView';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => state.resetPassword;

export default asyncConnect(resolve, mapState, actions)(ResetPasswordView);
