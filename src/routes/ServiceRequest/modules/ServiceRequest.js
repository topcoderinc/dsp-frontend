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
  providerCoords: {
    lat: -6.1990000076671433,
    lng: 106.83877944946289,
  },
  distance: '8 km',
});
