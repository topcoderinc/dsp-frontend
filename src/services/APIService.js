import _ from 'lodash';
import superagent from 'superagent';
import superagentPromise from 'superagent-promise';
import config from '../../config/default';

// DEMO: emulate API requests with dummy data for demo purposes

const request = superagentPromise(superagent, Promise);

const myRequestStatus = [
  {
    id: '1',
    title: 'Xtreme Food Delivery',
    provider: 'XtremeDrone',
    timeOflaunch: '09:45 AM Sep, 15 2016',
    status: 'inProgress',
  },
  {
    id: '2',
    title: 'Xtreme Food Delivery',
    provider: 'SuperDrone',
    timeOflaunch: '09:45 AM Sep, 15 2016',
    status: 'inProgress',
  },
  {
    id: '3',
    title: 'Xtreme Food Delivery',
    provider: 'DroneManiac',
    timeOflaunch: '09:45 AM Sep, 15 2016',
    status: 'inProgress',
  },
  {
    id: '4',
    title: 'Xtreme Food Delivery',
    provider: 'XtremeDrone',
    timeOflaunch: '09:45 AM Sep, 15 2016',
    status: 'cancelled',
  },
  {
    id: '5',
    title: 'Xtreme Food Delivery',
    provider: 'SuperDrone',
    timeOflaunch: '09:45 AM Sep, 15 2016',
    status: 'cancelled',
  },
  {
    id: '6',
    title: 'Xtreme Food Delivery',
    provider: 'DroneManiac',
    timeOflaunch: '09:45 AM Sep, 15 2016',
    status: 'completed',
  },
  {
    id: '7',
    title: 'Xtreme Food Delivery',
    provider: 'XtremeDrone',
    timeOflaunch: '09:45 AM Sep, 15 2016',
    status: 'completed',
  },
  {
    id: '8',
    title: 'Xtreme Food Delivery',
    provider: 'SuperDrone',
    timeOflaunch: '09:45 AM Sep, 15 2016',
    status: 'completed',
  },
];

const missionGallery = [
  {
    id: '1',
    type: 'image',
    src: '/assets/mission-gallery-image-01.jpg',
  },
  {
    id: '2',
    type: 'image',
    src: '/assets/mission-gallery-image-02.jpg',
  },
  {
    id: '3',
    type: 'image',
    src: '/assets/mission-gallery-image-03.jpg',
  },
  {
    id: '4',
    type: 'image',
    src: '/assets/mission-gallery-image-04.jpg',
  },
  {
    id: '5',
    type: 'image',
    src: '/assets/mission-gallery-image-01.jpg',
  },
  {
    id: '6',
    type: 'image',
    src: '/assets/mission-gallery-image-02.jpg',
  },
  {
    id: '7',
    type: 'image',
    src: '/assets/mission-gallery-image-03.jpg',
  },
  {
    id: '8',
    type: 'image',
    src: '/assets/mission-gallery-image-04.jpg',
  },
  {
    id: '9',
    type: 'image',
    src: '/assets/mission-gallery-image-01.jpg',
  },
  {
    id: '10',
    type: 'image',
    src: '/assets/mission-gallery-image-02.jpg',
  },
  {
    id: '11',
    type: 'image',
    src: '/assets/mission-gallery-image-03.jpg',
  },
  {
    id: '12',
    type: 'image',
    src: '/assets/mission-gallery-image-04.jpg',
  },

  {
    id: '13',
    type: 'image',
    src: '/assets/mission-gallery-image-03.jpg',
  },
  {
    id: '14',
    type: 'image',
    src: '/assets/mission-gallery-image-04.jpg',
  },
];

const projectInfo = {
  name: 'Lorem ipsum demolition',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.',
  address: '2312 N Wakefield St, Arlington, VA, 22207',
  contactName: 'Jane Doe',
  tel: '(+111) 123 456 789',
};

const overallDronePerformance = {
  total: 4.3,
  speed: 4.0,
  easeOfuse: 4.4,
  flight: 4.4,
  camera: 4.4,
};

const droneGraphPerformance = {
  altitude: [
    [Date.UTC(2010, 0, 1, 10), 0],
    [Date.UTC(2010, 0, 1, 10, 40), 931.28],
    [Date.UTC(2010, 0, 1, 11, 30), 1409.31],
    [Date.UTC(2010, 0, 1, 12, 30), 1365.25],
    [Date.UTC(2010, 0, 1, 13, 30), 1085.68],
    [Date.UTC(2010, 0, 1, 14, 30), 1254.6],
    [Date.UTC(2010, 0, 1, 15), 0],
  ],
  speed: [
    [Date.UTC(2010, 0, 1, 10), 0],
    [Date.UTC(2010, 0, 1, 10, 40), 3.03],
    [Date.UTC(2010, 0, 1, 11, 30), 12.89],
    [Date.UTC(2010, 0, 1, 12, 30), 8.17],
    [Date.UTC(2010, 0, 1, 13, 30), 9.93],
    [Date.UTC(2010, 0, 1, 14, 30), 5.1],
    [Date.UTC(2010, 0, 1, 15), 0],
  ],
};

const mission = {
  plannedHomePosition: {
    autoContinue: true,
    command: 21,
    coordinate: [
      -6.204569263907068,
      106.80788040161133,
      0,
    ],
    frame: 0,
    id: 0,
    param1: 0,
    param2: 0,
    param3: 0,
    param4: 0,
    type: 'missionItem',
  },
  missionItems: [
    {
      autoContinue: true,
      command: 22,
      coordinate: [
        -6.176068968489495,
        106.85096740722656,
        0,
      ],
      frame: 3,
      id: 1,
      param1: 0,
      param2: 0,
      param3: 0,
      param4: 0,
      type: 'missionItem',
    },
    {
      autoContinue: true,
      command: 16,
      coordinate: [
        -6.1897219964816745,
        106.85791969299316,
        0,
      ],
      frame: 3,
      id: 2,
      param1: 0,
      param2: 0,
      param3: 0,
      param4: 0,
      type: 'missionItem',
    },
    {
      autoContinue: true,
      command: 16,
      coordinate: [
        -6.205251886842353,
        106.8541431427002,
        0,
      ],
      frame: 3,
      id: 3,
      param1: 0,
      param2: 0,
      param3: 0,
      param4: 0,
      type: 'missionItem',
    },
    {
      autoContinue: true,
      command: 16,
      coordinate: [
        -6.202180076671433,
        106.83877944946289,
        0,
      ],
      frame: 3,
      id: 4,
      param1: 0,
      param2: 0,
      param3: 0,
      param4: 0,
      type: 'missionItem',
    },
    {
      autoContinue: true,
      command: 16,
      coordinate: [
        -6.207726387569505,
        106.81929588317871,
        0,
      ],
      frame: 3,
      id: 5,
      param1: 0,
      param2: 0,
      param3: 0,
      param4: 0,
      type: 'missionItem',
    },
  ],
};

const droneCoords = {
  lat: -6.202180076671433,
  lng: 106.83877944946289,
};

const providerCoords = {
  lat: -6.1990000076671433,
  lng: 106.83877944946289,
};

const statusDetail = {
  1: {
    title: 'Xtreme Food Delivery',
    status: 'inProgress',
    launchedAt: '09:45 AM Dec, 1 2016',
    completedAt: '',
    speed: '78 mph',
    distance: '23 km',
    driver: 'Ibrahim Saleh',
    fcStreamSrc: '/assets/front-camera.jpg',
    bcStreamSrc: '/assets/back-camera.jpg',
    missionGallery: [],
    missionGalleryNote: '',
    projectInfo: {},
    overallDronePerformance: {},
    droneGraphPerformance: {},
    mission,
    eta: '00:34:56',
    droneCoords,
    providerCoords,
  },
  2: {
    title: 'Xtreme Food Delivery',
    status: 'inProgress',
    launchedAt: '09:45 AM Dec, 2 2016',
    completedAt: '',
    speed: '78 mph',
    distance: '23 km',
    driver: 'Ibrahim Saleh',
    fcStreamSrc: '/assets/front-camera.jpg',
    bcStreamSrc: '/assets/back-camera.jpg',
    missionGallery: [],
    missionGalleryNote: '',
    projectInfo: {},
    overallDronePerformance: {},
    droneGraphPerformance: {},
    mission,
    eta: '00:34:56',
    droneCoords,
    providerCoords,
  },
  3: {
    title: 'Xtreme Food Delivery',
    status: 'inProgress',
    launchedAt: '09:45 AM Dec, 3 2016',
    completedAt: '',
    speed: '78 mph',
    distance: '23 km',
    driver: 'Ibrahim Saleh',
    fcStreamSrc: '/assets/front-camera.jpg',
    bcStreamSrc: '/assets/back-camera.jpg',
    missionGallery: [],
    missionGalleryNote: '',
    projectInfo: {},
    overallDronePerformance: {},
    droneGraphPerformance: {},
    mission,
    eta: '00:34:56',
    droneCoords,
    providerCoords,
  },
  4: {
    title: 'Xtreme Food Delivery',
    status: 'cancelled',
    launchedAt: '09:45 AM Dec, 1 2016',
    completedAt: '',
    speed: '-',
    distance: '23 km',
    driver: 'Ibrahim Saleh',
    fcStreamSrc: '',
    bcStreamSrc: '',
    missionGallery: [],
    missionGalleryNote: '',
    projectInfo: {},
    overallDronePerformance: {},
    droneGraphPerformance: {},
    mission,
    eta: '',
    droneCoords: null,
    providerCoords: null,
  },
  5: {
    title: 'Xtreme Food Delivery',
    status: 'cancelled',
    launchedAt: '09:45 AM Dec, 1 2016',
    completedAt: '',
    speed: '-',
    distance: '23 km',
    driver: 'Ibrahim Saleh',
    fcStreamSrc: '',
    bcStreamSrc: '',
    missionGallery: [],
    missionGalleryNote: '',
    projectInfo: {},
    overallDronePerformance: {},
    droneGraphPerformance: {},
    mission,
    eta: '',
    droneCoords: null,
    providerCoords: null,
  },
  6: {
    title: 'Xtreme Food Delivery',
    status: 'completed',
    launchedAt: '09:45 AM Dec, 1 2016',
    completedAt: '',
    speed: '78 mph',
    distance: '23 km',
    driver: 'Ibrahim Saleh',
    fcStreamSrc: '/assets/front-camera.jpg',
    bcStreamSrc: '/assets/back-camera.jpg',
    missionGallery,
    missionGalleryNote: 'Filmed by Drone Maniac #1 in Los Angeles, CA',
    projectInfo,
    overallDronePerformance,
    droneGraphPerformance,
    mission,
    eta: '',
    droneCoords: null,
    providerCoords: null,
  },
  7: {
    title: 'Xtreme Food Delivery',
    status: 'completed',
    launchedAt: '09:45 AM Dec, 1 2016',
    completedAt: '',
    speed: '78 mph',
    distance: '23 km',
    driver: 'Ibrahim Saleh',
    fcStreamSrc: '/assets/front-camera.jpg',
    bcStreamSrc: '/assets/back-camera.jpg',
    missionGallery,
    missionGalleryNote: 'Filmed by Drone Maniac #1 in Los Angeles, CA',
    projectInfo,
    overallDronePerformance,
    droneGraphPerformance,
    mission,
    eta: '',
    droneCoords: null,
    providerCoords: null,
  },
  8: {
    title: 'Xtreme Food Delivery',
    status: 'completed',
    launchedAt: '09:45 AM Dec, 1 2016',
    completedAt: '',
    speed: '78 mph',
    distance: '23 km',
    driver: 'Ibrahim Saleh',
    fcStreamSrc: '/assets/front-camera.jpg',
    bcStreamSrc: '/assets/back-camera.jpg',
    missionGallery,
    missionGalleryNote: 'Filmed by Drone Maniac #1 in Los Angeles, CA',
    projectInfo,
    overallDronePerformance,
    droneGraphPerformance,
    mission,
    eta: '',
    droneCoords: null,
    providerCoords: null,
  },
};

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
  static fetchMyRequestStatus(filterByStatus) {
    return (new Promise((resolve) => {
      resolve();
    })).then(() => (
      filterByStatus && filterByStatus !== 'all'
        ? _.filter(myRequestStatus, (req) => req.status === filterByStatus)
        : myRequestStatus
    ));
  }

  static getStatusDetail(id) {
    return (new Promise((resolve) => {
      resolve();
    })).then(() => statusDetail[id]);
  }

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

  static createMission(missionEntity) {
    return regAndAuth().then((authRes) => {
      const accessToken = authRes.body.accessToken;

      return request
        .post(`${config.API_BASE_PATH}/api/v1/missions`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(missionEntity)
        .end()
        .then((res) => res.body);
    });
  }

  static updateMission(id, missionEntity) {
    return regAndAuth().then((authRes) => {
      const accessToken = authRes.body.accessToken;

      return request
        .put(`${config.API_BASE_PATH}/api/v1/missions/${id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(missionEntity)
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

  /**
   * Search drones
   * @param {Object} params
   * @param {Number} params.limit the limit
   * @param {Number} params.offset the offset
   * @returns {{total: Number, items: Array}} the result
   */
  static searchDrones(params) {
    return request
      .get(`${config.API_BASE_PATH}/api/v1/drones`)
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
    return request.get(`${config.API_BASE_PATH}/api/v1/droneposition/${id}`).query({ limit }).end();
  }
}
