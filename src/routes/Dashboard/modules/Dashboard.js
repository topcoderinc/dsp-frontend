import {handleActions} from 'redux-actions';

// ------------------------------------
// Actions
// ------------------------------------


export const sendRequest = (values) => new Promise((resolve) => {
  /* eslint-disable no-alert */
  alert(JSON.stringify(values, null, 2));
  /* eslint-enable no-alert */
  resolve();
});


export const actions = {
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
}, {
  dashboardRequests: [{
    id: '03450',
    deliveryDate: '2016-12-01T12:59:16.714Z',
    deliveryLocation: 'Street address loren ipsum City, State, 12345',
    status: 'in_progress',
  }, {
    id: '03450',
    deliveryDate: '2016-12-01T12:59:16.714Z',
    deliveryLocation: 'Street address loren ipsum City, State, 12345',
    status: 'cancelled',
  }, {
    id: '03450',
    deliveryDate: '2016-12-01T12:59:16.714Z',
    deliveryLocation: 'Street address loren ipsum City, State, 12345',
    status: 'completed',
  }, {
    id: '03450',
    deliveryDate: '2016-12-01T12:59:16.714Z',
    deliveryLocation: 'Street address loren ipsum City, State, 12345',
    status: 'in_progress',
  }, {
    id: '03450',
    deliveryDate: '2016-12-01T12:59:16.714Z',
    deliveryLocation: 'Street address loren ipsum City, State, 12345',
    status: 'cancelled',
  }, {
    id: '03450',
    deliveryDate: '2016-12-01T12:59:16.714Z',
    deliveryLocation: 'Street address loren ipsum City, State, 12345',
    status: 'in_progress',
  }, {
    id: '03450',
    deliveryDate: '2016-12-01T12:59:16.714Z',
    deliveryLocation: 'Street address loren ipsum City, State, 12345',
    status: 'completed',
  }, {
    id: '03450',
    deliveryDate: '2016-12-01T12:59:16.714Z',
    deliveryLocation: 'Street address loren ipsum City, State, 12345',
    status: 'in_progress',
  }],
  dashboardStatus: {
    pendingRequests: 125,
    scheduledMissions: 2342,
    inProgressMissions: 342,
    completedMissions: 222,
    totalDrones: 444,
  },
  latestNotifications: [{
    type: 'system',
    summary: 'Dron DJI Inspire 1 Pro got error while functioning',
    link: '#',
    time: '2 minutes ago',
  }, {
    type: 'message',
    summary: 'John Longamus send a message!',
    link: '#',
    time: '2 minutes ago',
  }, {
    type: 'message',
    summary: 'John Longamus send a message!',
    link: '#',
    time: '2 minutes ago',
  }],
  recentExecutedRequests: [{
    drone: 'Drone Flypro XEagle Pro',
    requestNumber: '03448',
    time: '2 minutes ago',
  }, {
    drone: 'Drone Flypro XEagle Pro',
    requestNumber: '1342',
    time: '2 minutes ago',
  }, {
    drone: 'Drone Flypro XEagle Pro',
    requestNumber: '6543',
    time: '2 minutes ago',
  }, {
    drone: 'Drone Flypro XEagle Pro',
    requestNumber: '3222',
    time: '2 minutes ago',
  }],
});
