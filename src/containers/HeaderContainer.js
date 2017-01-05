import Header from 'components/Header';
import {asyncConnect} from 'redux-connect';
import {actions, logoutAction, logout} from '../store/modules/global';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapState = (state) => ({...state.global, doLogout: logout});

export default asyncConnect(resolve, mapState, {...actions, logoutAction})(Header);

