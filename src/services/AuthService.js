/**
 * Copyright (c) 2016 Topcoder Inc, All rights reserved.
 */

/**
 * auth0 Authentication service for the app.
 *
 * @author       TCSCODER
 * @version      1.0.0
 */

import Auth0 from 'auth0-js';
import config from '../config';
import UserApi from '../api/User';
import _ from 'lodash';


const userApi = new UserApi(config.api.basePath);
const idTokenKey = 'id_token';

class AuthService {

  /**
   * Default constructor
   * @param  {String}     clientId      the auth0 client id
   * @param  {String}     domain        the auth0 domain
   */
  constructor(clientId, domain) {
    this.auth0 = new Auth0({
      clientID: clientId,
      domain,
      responseType: 'token',
      callbackURL: config.AUTH0_CALLBACK,
    });
    this.login = this.login.bind(this);
    this.parseHash = this.parseHash.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.logout = this.logout.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.getHeader = this.getHeader.bind(this);
  }

  /**
   * Redirects the user to appropriate social network for oauth2 authentication
   *
   * @param  {Object}     params        any params to pass to auth0 client
   * @param  {Function}   onError       function to execute on error
   */
  login(params, onError) {
    // redirects the call to auth0 instance
    this.auth0.login(params, onError);
  }

  /**
   * Parse the hash fragment of url
   * This method will actually parse the token
   * will create a user profile if not already present and save the id token in local storage
   * if there is some error delete the access token
   * @param  {String}     hash            the hash fragment
   */
  parseHash(hash) {
    const _self = this;
    const authResult = _self.auth0.parseHash(hash);
    if (authResult && authResult.idToken) {
      _self.setToken(authResult.idToken);
      // get social profile
      _self.getProfile((error, profile) => {
        if (error) {
          // remove the id token
          _self.removeToken();
          throw error;
        } else {
          userApi.registerSocialUser(profile.name, profile.email, _self.getToken()).then(
            (authResult) => {
              localStorage.setItem('userInfo', JSON.stringify(authResult));
            }).catch((reason) => {
            // remove the id token
              _self.removeToken();
              throw reason;
            });
        }
      });
    }
  }

  /**
   * Check if the user is logged in
   * @param  {String}     hash            the hash fragment
   */
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken();
  }

  /**
   * Set the id token to be stored in local storage
   * @param  {String}     idToken          the token to store
   */
  setToken(idToken) {
    // Saves user token to localStorage
    localStorage.setItem(idTokenKey, idToken);
  }

  /**
   * Get the stored id token from local storage
   */
  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem(idTokenKey);
  }

  /**
   * Remove the id token from local storage
   */
  removeToken() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem(idTokenKey);
  }

  /**
   * Logout the user from the application, delete the id token
   */
  logout() {
    this.removeToken();
  }

  /**
   * Get the authorization header for API access
   */
  getHeader() {
    return {
      Authorization: `Bearer ${this.getToken()}`,
    };
  }

  /**
   * Get the profile of currently logged in user
   *
   * @param   {callback}     the callback function to call after operation finishes
   * @return  {Object}       the profile of logged in user
   */
  getProfile(callback) {
    this.auth0.getProfile(this.getToken(), callback);
  }
}

const defaultAuth0Service = new AuthService(config.AUTH0_CLIENT_ID, config.AUTH0_CLIENT_DOMAIN);

export {AuthService as default, defaultAuth0Service};
