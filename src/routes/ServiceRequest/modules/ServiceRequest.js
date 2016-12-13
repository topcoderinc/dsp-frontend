import { handleActions } from 'redux-actions';

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

  startLocation: {
    address: '36205 Snake Hill Rd',
    city: 'Middleburg',
    state: 'VA',
    zip: 20117,
  },
  endLocation: {
    address: '2312 N Wakefield St',
    city: 'Arlington',
    state: 'VA',
    zip: 20117,
  },
  doneCoords: {
    lat: 38.9050206,
    lng: -77.03699279999999,
  },
  wayPoints: [
    {

      lat: 38.9070206,
      lng: -77.03699279999999,
    },
    {
      lat: 38.9070612,

      lng: -77.0367732,
    },
    {
      lat: 38.9062931,
      lng: -77.0339575,
    },
    {
      lat: 38.9013403,
      lng: -77.03362080000001,
    },
    {
      lat: 38.90158539999999,
      lng: -77.03362469999999,
    },
    {
      lat: 38.90158539999999,
      lng: -77.03362469999999,
    },
  ],
  distance: '8 km',
});
