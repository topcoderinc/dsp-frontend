import {handleActions, createAction} from 'redux-actions';
import {browserHistory} from 'react-router';
import UserApi from 'api/User.js';
import config from '../../config';

import APIService from 'services/APIService';

const userApi = new UserApi(config.api.basePath);

//------------------------------------------------------------------------------
// Constants

const LOGIN_ACTION_FAILURE = 'LOGIN_ACTION_FAILURE';
const LOGIN_ACTION_SUCCESS = 'LOGIN_ACTION_SUCCESS';

const LOGIN_REDIRECT = {
  admin: '/admin',
  consumer: '/browse-provider',
  pilot: '/pilot',
  provider: '/dashboard',
};

const LOGOUT_ACTION = 'LOGOUT_ACTION';
const USER_INFO_KEY = 'userInfo';

// ------------------------------------
// Actions
// ------------------------------------

// TODO: Any use of these local variables should be eliminated!
// Their current usage should be entirely replaced using the redux state,
// and action payloads!
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

export const loginAction = (data) => (dispatch) => {
  userApi.login(data.email, data.password).then((res) => {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(res));
    dispatch({type: LOGIN_ACTION_SUCCESS});
    browserHistory.push(LOGIN_REDIRECT[res.user.role]);
  }).catch((failure) => {
    dispatch({
      type: LOGIN_ACTION_FAILURE,
      payload: JSON.parse(failure.response).error,
    });
  });
};

export const onSocialLoginSuccessAction = () => (dispatch) => {
  dispatch({type: LOGIN_ACTION_SUCCESS});
  browserHistory.push(LOGIN_REDIRECT[loadUserInfo().user.role]);
};

export const logoutAction = () => (dispatch) => {
  browserHistory.push('/home');
  dispatch({
    type: LOGOUT_ACTION,
  });
};

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
  [LOGIN_ACTION_FAILURE]: (state, action) => ({
    ...state,
    loggedUser: false,
    hasError: true,
    errorText: action.payload,
    user: {},
  }),
  [LOGIN_ACTION_SUCCESS]: (state) => ({
    ...state,
    loggedUser: true,
    hasError: false,
    errorText: '',
    user: (loadUserInfo() ? loadUserInfo().user : {}),
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
