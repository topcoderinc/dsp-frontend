import {handleActions, createAction} from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_ZONE = 'ServiceRequest/ADD_ZONE';
export const UPDATE_ZONE = 'ServiceRequest/UPDATE_ZONE';
export const DELETE_ZONE = 'ServiceRequest/DELETE_ZONE';

// ------------------------------------
// Actions
// ------------------------------------


export const sendRequest = (values, dispatch, state) => new Promise((resolve) => {
  alert(JSON.stringify({...values, zones: state.zones}, null, 2));
  resolve();
});


export const actions = {
  addZone: createAction(ADD_ZONE),
  updateZone: createAction(UPDATE_ZONE),
  deleteZone: createAction(DELETE_ZONE),
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [ADD_ZONE]: (state, {payload: {coordinates, point}}) => {
    const zone = {
      id: new Date().getTime(),
      description: 'New Zone',
      location: point ? {
        type: 'Point',
        coordinates: point,
      }
      : {
        type: 'Polygon',
        coordinates: [[...coordinates, coordinates[0]]],
      },
      style: {
        fillColor: 'green',
      },
    };
    return {...state, zones: [zone, ...state.zones]};
  },
  [UPDATE_ZONE]: (state, {payload: zone}) => ({
    ...state,
    zones: state.zones.map((item) => {
      if (item.id === zone.id) {
        return zone;
      }
      return item;
    }),
  }),
  [DELETE_ZONE]: (state, {payload: zone}) => ({
    ...state,
    zones: state.zones.filter((item) => item.id !== zone.id),
  }),
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
  zones: [],
});
