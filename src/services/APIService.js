import superagent from 'superagent';
import superagentPromise from 'superagent-promise';
import {API_BASE_URL} from '../../config/default';

const request = superagentPromise(superagent, Promise);

export default class APIService {

  /**
   * Search drones
   * @param {Object} params
   * @param {Number} params.limit the limit
   * @param {Number} params.offset the offset
   * @returns {{total: Number, items: Array}} the result
   */
  static searchDrones(params) {
    return request
      .get(`${API_BASE_URL}/api/v1/drones`)
      .query(params)
      .end();
  }
}
