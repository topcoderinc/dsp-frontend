/* eslint max-lines: 0 */

import superagent from 'superagent';
import superagentPromise from 'superagent-promise';
import config from '../config/index';

// DEMO: emulate API requests with dummy data for demo purposes

const request = superagentPromise(superagent, Promise);

const getToken = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    return JSON.parse(userInfo).accessToken;
  }
  return null;
};

export default class APIService {

  static fetchMyRequestStatus(status) {
    const accessToken = getToken();
    return request
      .get(`${config.api.basePath}/api/v1/requests`)
      .set('Authorization', `Bearer ${accessToken}`)
      .query({
        status,
        limit: -1, // fetch all for now
      })
      .end()
      .then((res) => res.body.items);
  }

  static fetchMissionList(params) {
    const token = this.accessToken;
    return request
      .get(`${config.api.basePath}/api/v1/missions`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .query(params)
      .end()
      .then((res) => ({
        total: res.body.total,
        items: res.body.items.map((item) => ({
          ...item,
          downloadLink: `${config.api.basePath}/api/v1/missions/${item.id}/download?token=${token}`,
        })),
      }));
  }

  static getMission(id) {
    return request
      .get(`${config.api.basePath}/api/v1/missions/${id}`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .end()
      .then((res) => res.body);
  }

  static createMission(values) {
    return request
      .post(`${config.api.basePath}/api/v1/missions`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .send(values)
      .end()
      .then((res) => res.body);
  }

  static updateMission(id, values) {
    return request
      .put(`${config.api.basePath}/api/v1/missions/${id}`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .send(values)
      .end()
      .then((res) => res.body);
  }

  static deleteMission(id) {
    return request
      .del(`${config.api.basePath}/api/v1/missions/${id}`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .end()
      .then((res) => res.body);
  }

  /**
   * Search drones
   * @param {Object} params
   * @param {Number} params.limit the limit
   * @param {Number} params.offset the offset
   * @returns {{total: Number, items: Array}} the result
   */
  static searchDrones(params) {
    return request
      .get(`${config.api.basePath}/api/v1/drones`)
      .query(params)
      .end();
  }

  /**
   * get location history of drone
   * @param  {String} id    id of drone
   * @param  {Number} limit limit to search
   * @returns {{total: Number, items: Array}} the result
   */
  static getLocations(id, limit) {
    return request.get(`${config.api.basePath}/api/v1/droneposition/${id}`).query({limit}).end();
  }

  /**
   * Search nfz
   * @param {Object} params
   * @param {Number} params.limit the limit
   * @param {Number} params.offset the offset
   * @param {Object} params.geometry the view geometry
   * @returns {{total: Number, items: Array}} the result
   */
  static searchNfz(params) {
    return request
      .post(`${config.api.basePath}/api/v1/nfz/search`)
      .send(params)
      .end()
      .then((res) => res.body);
  }

  /**
   * Create nfz
   * @param {Object} params
   * @returns {Object} the created nfz
   */
  static createNfz(params) {
    return request
      .post(`${config.api.basePath}/api/v1/nfz`)
      .send(params)
      .end()
      .then((res) => res.body);
  }

  /**
   * Update nfz
   * @param {Number} id
   * @param {Object} params
   * @returns {Object} the updated nfz
   */
  static updateNfz(id, params) {
    return request
      .put(`${config.api.basePath}/api/v1/nfz/${id}`)
      .send(params)
      .end()
      .then((res) => res.body);
  }

  /**
   * Delete nfz
   * @param {Number} id
   */
  static deleteNfz(id) {
    return request
      .del(`${config.api.basePath}/api/v1/nfz/${id}`)
      .end();
  }

  /**
   * Reset the user password
   * @param  {Object}   entity    the client request payload
   */
  static resetPassword(entity) {
    return request
      .post(`${config.api.basePath}/api/v1/reset-password`)
      .set('Content-Type', 'application/json')
      .send(entity)
      .end();
  }

  /**
   * Send the forgot password link to user's email account
   * @param  {Object}   entity    the client request payload
   */
  static forgotPassword(entity) {
    return request
      .post(`${config.api.basePath}/api/v1/forgot-password`)
      .set('Content-Type', 'application/json')
      .send(entity)
      .end();
  }

  /**
<<<<<<< HEAD
   * Get all drones current locations of the current provider
   * @return {Array} list of drones current locations
   */
  static fetchDronesCurrentLocations() {
    return request
      .get(`${config.api.basePath}/api/v1/provider/drones/current-locations`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .end()
      .then((res) => res.body);
  }

  /**
   * Search for the current provider drones
   * @param {Object} params
   * @param {Number} params.limit the limit
   * @param {Number} params.offset the offset
   * @returns {{total: Number, items: Array}} the result
   */
  static searchProviderDrones(params) {
    return request
      .get(`${config.api.basePath}/api/v1/provider/drones`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .query(params)
      .end()
      .then((res) => res.body);
  }

  /*
   * get the details of a specified package
   * @param {string}  id   the id of package
   */
  static getPackage(id) {
    return request
      .get(`${config.api.basePath}/api/v1/packages/${id}`)
      .end()
      .then((res) => res.body);
  }

  /**
   * Delete a drone of the current provider
   * @param  {String} id drone id
   */
  static deleteProviderDrone(id) {
    return request
      .del(`${config.api.basePath}/api/v1/provider/drones/${id}`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .end();
  }

  /**
   * Get provider drone data
   * @param  {String} id drone id
   * @return {Object} drone object
   */
  static fetchProviderDrone(id) {
    return request
      .get(`${config.api.basePath}/api/v1/provider/drones/${id}`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .end()
      .then((res) => res.body);
  }

  /*
   * send a request to a sepcified package
   * @param  {string}   id      the id of package
   * @param  {object}   entity  the detail of request
   */
  static requestPackage(id, entity) {
    const accessToken = getToken();
    return request
      .post(`${config.api.basePath}/api/v1/packages/${id}/request`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(entity)
      .end()
      .then((res) => res.body);
  }

  /**
   * Create provider drone
   * @param  {Object} drone drone object
   * @return {Object} drone object
   */
  static createProviderDrone(drone) {
    return request
      .post(`${config.api.basePath}/api/v1/provider/drones`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .send(drone)
      .end()
      .then((res) => res.body);
  }

  /*
   * get the details of a package request
   * @param  {string}   id  the id of the request
   */
  static getStatusDetail(id) {
    const accessToken = getToken();
    return request
      .get(`${config.api.basePath}/api/v1/requests/${id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .end()
      .then((res) => res.body);
  }

  /**
   * Update provider drone
   * @param  {Object} drone drone object
   * @return {Object} drone object
   */
  static updateProviderDrone(id, drone) {
    return request
      .put(`${config.api.basePath}/api/v1/provider/drones/${id}`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .send(drone)
      .end()
      .then((res) => res.body);
  }

  /*
   * get the list of package requests by provider
   * @param  {string}   params  parameters to search
   */
  static getRequestsByProvider(params) {
    const accessToken = getToken();
    return request
      .get(`${config.api.basePath}/api/v1/provider/requests/`)
      .set('Authorization', `Bearer ${accessToken}`)
      .query(params)
      .end()
      .then((res) => res.body);
  }

  /**
   * Get provider drone's missions
   * (they are sorted by startedAt, newer first)
   * @param  {String} id drone id
   * @return {Array} mission list
   */
  static fetchProviderDroneMissions(id, params) {
    return request
      .get(`${config.api.basePath}/api/v1/provider/drones/${id}/missions`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .query(params)
      .end()
      .then((res) => res.body);
  }

  /*
   * send the review of specified mission
   * @param  {string} id     id of the mission
   * @param  {object} entity detail of the review
   */
  static sendReview(id, entity) {
    const accessToken = getToken();
    return request
      .post(`${config.api.basePath}/api/v1/missions/${id}/review`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(entity)
      .end()
      .then((res) => res.body);
  }

  /**
   * Get provider drone mission quantities for a month
   * @param  {String} id drone id
   * @return {Array} mission quantities
   */
  static fetchProviderDroneMonthMissions(id, month) {
    return request
      .get(`${config.api.basePath}/api/v1/provider/drones/${id}/missions/monthly-count?month=${month}`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .end()
      .then((res) => res.body);
  }

  /*
   * accept a package request
   * @param  {string} id  id of the package request
   */
  static acceptRequest(id) {
    const accessToken = getToken();
    return request
      .post(`${config.api.basePath}/api/v1/provider/requests/${id}/accept`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
      .end()
      .then((res) => res.body);
  }

  /**
   * Get pilot checklist by mission id
   * @param  {String}   id    mission id
   */
  static getPilotChecklist(id) {
    return request
      .get(`${config.api.basePath}/api/v1/pilot/checklist/${id}/`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .end()
      .then((res) => res.body);
  }

  /*
   * reject a package request
   * @param  {string} id  id of the package request
   */
  static rejectRequest(id) {
    const accessToken = getToken();
    return request
      .post(`${config.api.basePath}/api/v1/provider/requests/${id}/reject`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
      .end()
      .then((res) => res.body);
  }

  /**
   * Update pilot checklist by mission id
   * @param  {String}   id          mission id
   * @param  {Object}   checklist   checklist object
   */
  static updatePilotChecklist(id, checklist) {
    return request
      .put(`${config.api.basePath}/api/v1/pilot/checklist/${id}/`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .send(checklist)
      .end()
      .then((res) => res.body);
  }

  /**
   * get drones of provider
   * @param {object} params query critiria
   */

  static getProviderDrones(params) {
    const accessToken = getToken();
    return request
      .get(`${config.api.basePath}/api/v1/provider/drones`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .query(params)
      .end()
      .then((res) => res.body);
  }

  /**
   * Fetch pilot missions
   * @param  {Object}   params          params
   * @param  {Number}   params.limit    the limit
   * @param  {Number}   params.offset   the offset
   * @param  {String}   params.sortBy   sort by property name
   */
  static fetchPilotMissions(params) {
    return request
      .get(`${config.api.basePath}/api/v1/pilot/missions`)
      .set('Authorization', `Bearer ${this.accessToken}`)
      .query(params)
      .end()
      .then((res) => res.body);
  }

  static assignDrone(requestId, droneId) {
    const accessToken = getToken();
    return request
      .post(`${config.api.basePath}/api/v1/provider/requests/${requestId}/assign-drone`)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        droneId,
        scheduledLaunchDate: new Date(),
      })
      .end()
      .then((res) => res.body);
  }
}
