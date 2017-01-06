import {handleActions, createAction} from 'redux-actions';
import _ from 'lodash';
import {browserHistory} from 'react-router';
import APIService from 'services/APIService';

// ------------------------------------
// Constants
// ------------------------------------
export const ADD_ZONE = 'ServiceRequest/ADD_ZONE';
export const UPDATE_ZONE = 'ServiceRequest/UPDATE_ZONE';
export const DELETE_ZONE = 'ServiceRequest/DELETE_ZONE';
export const PACKAGE_LOADED = 'ServiceRequest/PACKAGE_LOADED';
export const CLEAR_ADDRESS = 'ServiceRequest/CLEAR_ADDRESS';
export const SELECT_ADDRESS = 'ServiceRequest/SELECT_ADDRESS';
export const CANCEL_SELECT_ADDRESS = 'ServiceRequest/CANCEL_SELECT_ADDRESS';
export const SET_ADDRESS = 'ServiceRequest/SET_ADDRESS';
export const CANCEL_REQUEST = 'ServiceRequest/CANCEL_REQUEST';

// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
  addZone: createAction(ADD_ZONE),
  updateZone: createAction(UPDATE_ZONE),
  deleteZone: createAction(DELETE_ZONE),
  packageLoaded: createAction(PACKAGE_LOADED),
  clearAddress: createAction(CLEAR_ADDRESS),
  selectAddress: createAction(SELECT_ADDRESS),
  cancelSelectAddress: createAction(CANCEL_SELECT_ADDRESS),
  setAddress: createAction(SET_ADDRESS),
  cancelRequest: createAction(CANCEL_REQUEST),
};

export const loadPackage = (id, dispatch) => APIService.getPackage(id).then(
  (pack) => dispatch(actions.packageLoaded(_.pick(pack, 'id', 'serviceType')))
);

export const sendRequest = (values, state) => {
  const {startLocation, endLocation} = state;
  const entity = {};

  entity.whatToBeDelivered = values.description;
  entity.title = values.title;

  if (state.serviceType === 'Delivery') {
    entity.recipientName = values.contactName;
    entity.phoneNumber = values.contactPhone;
    entity.destinationPoint = {
      coordinates: [endLocation.coor.lng(), endLocation.coor.lat()],
      line1: values.endLine1,
      line2: values.endLine2,
      city: values.endCity,
      postalCode: values.endPostalCode,
      state: values.endState,
      primary: true,
    };
    entity.startingPoint = {
      coordinates: [startLocation.coor.lng(), startLocation.coor.lat()],
      line1: values.startLine1,
      line2: values.startLine2,
      city: values.startCity,
      postalCode: values.startPostalCode,
      state: values.startState,
      primary: true,
    };
    entity.launchDate = values.date;
  } else {
    entity.zones = state.zones.map((z) => _.omit(z, 'id'));
  }
  return APIService.requestPackage(state.id, entity).then(() => {
    browserHistory.push('/my-request-status');
  });
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
  [PACKAGE_LOADED]: (state, {payload}) => ({
    ...state,
    ...payload,
  }),
  [CLEAR_ADDRESS]: (state, {payload}) => {
    const newState = {
      ...state,
      distance: null,
    };

    if (payload === 'start') {
      newState.startLocation = null;
    } else {
      newState.endLocation = null;
    }

    return newState;
  },
  [SELECT_ADDRESS]: (state, {payload}) => ({
    ...state,
    selectingAddress: payload,
  }),
  [CANCEL_SELECT_ADDRESS]: (state) => ({
    ...state,
    selectingAddress: null,
  }),
  [SET_ADDRESS]: (state, {payload}) => {
    const newState = {
      ...state,
    };
    if (payload.type === 'start') {
      newState.startLocation = _.omit(payload, 'type');
    } else {
      newState.endLocation = _.omit(payload, 'type');
    }
    if (newState.startLocation && newState.endLocation) {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        newState.startLocation.coor,
        newState.endLocation.coor);

      newState.distance = `${(distance / 1000).toFixed(2)} km`;
    }
    return newState;
  },
  [CANCEL_REQUEST]: (state) => ({
    ...state,
    zones: [],
    startLocation: null,
    endLocation: null,
  }),
}, {
  zones: [],
});
