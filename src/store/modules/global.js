import {handleActions, createAction} from 'redux-actions';
import {browserHistory} from 'react-router';
import UserApi from 'api/User.js';
import config from '../../config';

const userApi = new UserApi(config.default.api.basePath);

// ------------------------------------
// Actions
// ------------------------------------
let isLogged = false;
let hasError = false;
let errorText = '';

export const sendLoginRequest = (values) => new Promise((resolve) => {
  userApi.login(values.email, values.password).then((authResult) => {
    isLogged = true;
    hasError = false;
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
  userApi.register('name', values.email, values.password).then(() => {
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

export const signupAction = createAction('SIGNUP_ACTION');

export const actions = {
  toggleNotification, loginAction,
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
    ...state, loggedUser: isLogged, hasError, errorText,
  }),
  [signupAction]: (state) => ({
    ...state, loggedUser: isLogged, hasError, errorText,
  }),
}, {
  toggleNotif: false,
  loggedUser: false,
  location: 'Jakarta, Indonesia',
  selectedCategory: 'Category',
  categories: [
    {name: 'Category1'},
    {name: 'Category2'},
  ],
  user: {
    name: 'John Doe',
  },
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
