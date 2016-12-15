import superagent from 'superagent';
import superagentPromise from 'superagent-promise';
import _ from 'lodash';
import config from '../../config/default';

const request = superagentPromise(superagent, Promise);

/*
  As there is no Authorization implemented in the project.
  Here I've hardcoded automatic registering and authorization of a dumb user to make requests to the server.
  This should be removed when real authorizatin is implemented.
 */
const testUser = {
  firstName: 'test',
  lastName: 'test',
  email: 'kj2h34jh23424h2l34h324ljh1@khj4k234hl234hjl.com',
  phone: '42',
  password: 'qwerty',
};

const register = () => request
  .post(`${config.API_BASE_PATH}/api/v1/register`)
  .send(testUser)
  .set('Content-Type', 'application/json')
  .end();

const authorize = () => request
  .post(`${config.API_BASE_PATH}/api/v1/login`)
  .set('Content-Type', 'application/json')
  .send(_.pick(testUser, 'email', 'password'))
  .end();

const regAndAuth = () => authorize().then(
  authorize,
  () => register().then(authorize),
);

export default class APIService {
  static fetchMissionList() {
    return regAndAuth().then((authRes) => {
      const accessToken = authRes.body.accessToken;

      return request
        .get(`${config.API_BASE_PATH}/api/v1/missions`)
        .set('Authorization', `Bearer ${accessToken}`)
        .end()
        .then((res) => res.body.items.map((item) => ({
          ...item,
          downloadLink: `${config.API_BASE_PATH}/api/v1/missions/${item.id}/download?token=${accessToken}`,
        })));
    });
  }

  static getMission(id) {
    return regAndAuth().then((authRes) => {
      const accessToken = authRes.body.accessToken;

      return request
        .get(`${config.API_BASE_PATH}/api/v1/missions/${id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .end()
        .then((res) => res.body);
    });
  }

  static createMission(mission) {
    return regAndAuth().then((authRes) => {
      const accessToken = authRes.body.accessToken;

      return request
        .post(`${config.API_BASE_PATH}/api/v1/missions`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(mission)
        .end()
        .then((res) => res.body);
    });
  }

  static updateMission(id, mission) {
    return regAndAuth().then((authRes) => {
      const accessToken = authRes.body.accessToken;

      return request
        .put(`${config.API_BASE_PATH}/api/v1/missions/${id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(mission)
        .end()
        .then((res) => res.body);
    });
  }

  static deleteMission(id) {
    return regAndAuth().then((authRes) => {
      const accessToken = authRes.body.accessToken;

      return request
        .del(`${config.API_BASE_PATH}/api/v1/missions/${id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .end()
        .then((res) => res.body);
    });
  }
}
