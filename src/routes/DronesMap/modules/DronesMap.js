import {handleActions} from 'redux-actions';
import io from 'socket.io-client';
import _ from 'lodash';
import APIService from 'services/APIService';
import config from '../../../config/index';

// Drones will be updated and map will be redrawn every 3s
// Otherwise if drones are updated with high frequency (e.g. 0.5s), the map will be freezing
const MIN_REDRAW_DIFF = 3000;

// can't support more than 10k drones
// map will be very slow
const DRONE_LIMIT = 10000;

const LOCATION_LIMIT = 100;

let socket;
let pendingUpdates = {};
let lastUpdated = null;
let updateTimeoutId;

// ------------------------------------
// Constants
// ------------------------------------
export const DRONES_LOADED = 'DronesMap/DRONES_LOADED';
export const DRONES_UPDATED = 'DronesMap/DRONES_UPDATED';
export const LOCATIONS_LOADED = 'DronesMap/LOCATIONS_LOADED';
export const SHOW_DRONE_INFO = 'DronesMap/SHOW_DRONE_INFO';
export const HIDE_DRONE_INFO = 'DronesMap/HIDE_DRONE_INFO';
export const HIDE_HISTORY = 'DronesMap/HIDE_HISTORY';
// ------------------------------------
// Actions
// ------------------------------------


// load drones and initialize socket
export const init = () => async(dispatch) => {
  const {body: {items: drones}} = await APIService.searchDrones({limit: DRONE_LIMIT});
  lastUpdated = new Date().getTime();
  dispatch({type: DRONES_LOADED, payload: {drones}});
  socket = io(config.socket.url);
  socket.on('dronepositionupdate', (drone) => {
    pendingUpdates[drone.id] = drone;
    if (updateTimeoutId) {
      return;
    }
    updateTimeoutId = setTimeout(() => {
      dispatch({type: DRONES_UPDATED, payload: pendingUpdates});
      pendingUpdates = {};
      updateTimeoutId = null;
      lastUpdated = new Date().getTime();
    }, Math.max(MIN_REDRAW_DIFF - (new Date().getTime() - lastUpdated)), 0);
  });
};

// disconnect socket
export const disconnect = () => () => {
  socket.disconnect();
  socket = null;
  clearTimeout(updateTimeoutId);
  updateTimeoutId = null;
  pendingUpdates = {};
  lastUpdated = null;
};

// get location history of drone
export const getLocations = (id) => async(dispatch) => {
  const {body: {items: locations}} = await APIService.getLocations(id, LOCATION_LIMIT);
  dispatch({type: LOCATIONS_LOADED, payload: {drone: id, locations: _.reverse(locations)}});
};

// clear location history of drone
export const hideHistory = () => (dispatch) => {
  dispatch({type: HIDE_HISTORY});
};

// show info window of drone
export const showInfo = (drone, pos) => (dispatch) => {
  dispatch({type: SHOW_DRONE_INFO, payload: {drone, pos}});
};

// hide info window of drone
export const hideInfo = () => (dispatch) => {
  dispatch({type: HIDE_DRONE_INFO});
};

export const actions = {
  init,
  disconnect,
  getLocations,
  hideHistory,
  showInfo,
  hideInfo,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [DRONES_LOADED]: (state, {payload: {drones}}) => ({...state, drones}),
  [DRONES_UPDATED]: (state, {payload: updates}) => ({
    ...state,
    drones: state.drones.map((drone) => {
      const updated = updates[drone.id];
      return updated || drone;
    }),
  }),
  [LOCATIONS_LOADED]: (state, {payload: {drone, locations}}) => ({...state, historyDrone: drone, locations}),
  [SHOW_DRONE_INFO]: (state, {payload: {drone, pos}}) => ({
    ...state,
    infoDrone: drone,
    infoPos: pos,
  }),
  [HIDE_DRONE_INFO]: (state) => ({
    ...state,
    infoDrone: null,
    infoPos: null,
  }),
  [HIDE_HISTORY]: (state) => ({
    ...state,
    locations: null,
    historyDrone: null,
  }),
}, {
  drones: null,
  // it will show the whole globe
  mapSettings: {
    zoom: 3,
    center: {lat: 0, lng: 0},
  },
});
