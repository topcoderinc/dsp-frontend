import {asyncConnect} from 'redux-connect';
import {actions} from '../modules/ResetPassword';
import {browserHistory} from 'react-router';

import ResetPasswordView from '../components/ResetPasswordView';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const handleSuccess = () => {
  browserHistory.push('/');
};

const mapState = (state) => ({...state.resetPassword, onSubmitSuccess: handleSuccess});

export default asyncConnect(resolve, mapState, actions)(ResetPasswordView);
