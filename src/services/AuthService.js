/**
 * Copyright (c) 2016 Topcoder Inc, All rights reserved.
 */

/**
 * auth0 Authentication service for the app.
 *
 * @author       TCSCODER
 * @version      1.0.0
 */

import Auth0Lock from 'auth0-lock'
import config from 'config/default';
import UserApi from 'api/UserApi';

const userApi = new UserApi(config.api.basePath);

export default class AuthService {

  constructor(clientId, domain) {
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      allowedConnections: ['google-oauth2', 'facebook', 'github'],
      autoclose: true
    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  _doAuthentication(authResult, a, b, c) {
    // Saves the user token
    this.setToken(authResult.idToken);
    var that = this;
    this.lock.getProfile(authResult.idToken, function(error, profile) {
        if (error) {
          console.log(error);
          return;
        }
        userApi.registerSocialUser(profile.name, profile.email).then((authResult) => {
            that.setToken(authResult.accessToken);
        }).catch((err) => {
            console.error(err);
        });
    });
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken();
  }

  setToken(idToken) {
    // Saves user token to sessionStorage
    sessionStorage.setItem('id_token', idToken);
  }

  getToken() {
    // Retrieves the user token from sessionStorage
    return sessionStorage.getItem('id_token');
  }

  logout() {
    // Clear user token and profile data from sessionStorage
    sessionStorage.removeItem('id_token');
  }

  getHeader() {
    return {
      Authorization: `Bearer ${this.getToken()}`
    }
  }
}