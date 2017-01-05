import {handleActions, createAction} from 'redux-actions';
import {browserHistory} from 'react-router';
import UserApi from 'api/User.js';
import config from '../../config';
import APIService from 'services/APIService';
import _ from 'lodash';

const userApi = new UserApi(config.api.basePath);

const userInfoKey = 'userInfo';

let isLogged = false;
let hasError = false;
let errorText = '';
let userInfo = {};

function loadUserInfo() {
  userInfo = localStorage.getItem(userInfoKey);
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    APIService.accessToken = userInfo.accessToken;
  }
  return userInfo;
}

// ------------------------------------
// Actions
// ------------------------------------
export const sendLoginRequest = (values) => new Promise((resolve) => {
  userApi.login(values.email, values.password).then((authResult) => {
    isLogged = true;
    hasError = false;
    userInfo = authResult;
    localStorage.setItem(userInfoKey, JSON.stringify(authResult));
    if (authResult.user.role === 'consumer') {
      browserHistory.push('/browse-provider');
    } else if (authResult.user.role === 'provider') {
      browserHistory.push('/dashboard');
    } else if (authResult.user.role === 'admin') {
      browserHistory.push('/admin');
    } else if (authResult.user.role === 'pilot') {
      browserHistory.push('/pilot-missions');
    }
  }).catch((err) => {
    isLogged = false;
    hasError = true;
    errorText = JSON.parse(err.responseText);
  });
  resolve();
});

export const sendSignupRequest = (values) => new Promise((resolve) => {
  userApi.register(values.firstName, values.lastName, values.email, values.password).then(() => {
    isLogged = true;
    hasError = false;
    browserHistory.push('/browse-provider');
  }).catch((err) => {
    isLogged = false;
    hasError = true;
    errorText = JSON.parse(err.responseText);
  });
  resolve();
});

export const logout = () => async() => {
  localStorage.removeItem(userInfoKey);
  userInfo = null;
  isLogged = false;
};

export const toggleNotification = createAction('TOGGLE_NOTIFICATION');

export const loginAction = createAction('LOGIN_ACTION');

export const logoutAction = createAction('LOGOUT_ACTION');

export const signupAction = createAction('SIGNUP_ACTION');

export const actions = {
  toggleNotification, loginAction, logoutAction,
};
// console.log(loginAction(true))
// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [toggleNotification]: (state, action) => ({
    ...state, toggleNotif: action.payload,
  }),
  [loginAction]: (state) => ({
    ...state, loggedUser: isLogged, hasError, errorText, user: (loadUserInfo() ? loadUserInfo().user : {}),
  }),
  [logoutAction]: (state) => ({
    ...state, loggedUser: isLogged, hasError, errorText, user: (loadUserInfo() ? loadUserInfo().user : {}),
  }),
  [signupAction]: (state) => ({
    ...state, loggedUser: isLogged, hasError, errorText, user: (loadUserInfo() ? loadUserInfo().user : {}),
  }),
}, {
  toggleNotif: false,
  loggedUser: !_.isNil(loadUserInfo()),
  location: 'Jakarta, Indonesia',
  selectedCategory: 'Category',
  categories: [
    {name: 'Category1'},
    {name: 'Category2'},
  ],
  user: loadUserInfo() ? loadUserInfo().user : {},
  notifications: [
    {
      id: 1,
      droneName: 'XdroneManiac',
      status: 'completed',
      time: '2 minutes ago',
      request: 'has completed your "Deliver My Package" request.',
    },
    {
      id: 2,
      droneName: 'XdroneManiac',
      status: 'started',
      time: '2 minutes ago',
      request: 'has started your "Deliver My Package" request.',
    },
  ],

});
