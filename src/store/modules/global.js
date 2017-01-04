import {handleActions, createAction} from 'redux-actions';
import {browserHistory} from 'react-router';
import UserApi from 'api/User.js';
import config from '../../config';

import APIService from 'services/APIService';

const userApi = new UserApi(config.api.basePath);

//------------------------------------------------------------------------------
// Constants

const LOGOUT_ACTION = 'LOGOUT_ACTION';
const USER_INFO_KEY = 'userInfo';

// ------------------------------------
// Actions
// ------------------------------------
let isLogged = false;
let hasError = false;
let errorText = '';
let userInfo = {};

function loadUserInfo() {
  userInfo = localStorage.getItem(USER_INFO_KEY);
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    APIService.accessToken = userInfo.accessToken;
  }
  return userInfo;
}

export const sendLoginRequest = (values) => new Promise((resolve) => {
  userApi.login(values.email, values.password).then((authResult) => {
    isLogged = true;
    hasError = false;
    userInfo = authResult;
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(authResult));
    if (authResult.user.role === 'consumer') {
      browserHistory.push('/browse-provider');
    } else if (authResult.user.role === 'provider') {
      browserHistory.push('/dashboard');
    } else if (authResult.user.role === 'admin') {
      browserHistory.push('/admin');
    } else if (authResult.user.role === 'pilot') {
      browserHistory.push('/pilot');
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

export const toggleNotification = createAction('TOGGLE_NOTIFICATION');

export const loginAction = createAction('LOGIN_ACTION');

export const logoutAction = () => dispatch => {
  browserHistory.push('/home');
  dispatch({
    type: LOGOUT_ACTION
  });
}

export const signupAction = createAction('SIGNUP_ACTION');

export const actions = {
  toggleNotification, loginAction, logoutAction,
};

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
  [LOGOUT_ACTION]: (state) => {
    localStorage.removeItem(USER_INFO_KEY);
    APIService.accessToken = '';
    isLogged = false;
    return ({
      ...state,
      loggedUser: false,
      hasError,
      errorText,
      user: {},
    });
  },
  [signupAction]: (state) => ({
    ...state, loggedUser: isLogged, hasError, errorText, user: (loadUserInfo() ? loadUserInfo().user : {}),
  }),
}, {
  toggleNotif: false,
  loggedUser: Boolean(loadUserInfo()),
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
