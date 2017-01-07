import {handleActions} from 'redux-actions';
import {push} from 'react-router-redux';
import _ from 'lodash';
import APIService from 'services/APIService';
import {toastr} from 'react-redux-toastr';

const defaultDrone = {
  serialNumber: '',
  name: '',
  type: '',
  minSpeed: '', // number
  maxSpeed: '', // number
  maxFlightTime: '', // number
  maxCargoWeight: '', // number
  maxAltitude: '', // number
  cameraResolution: '', // number
  videoResolution: '', // number
  hasWiFi: false,
  hasBluetooth: false,
  engineType: '',
  numberOfRotors: '', // integer
  hasAccelerometer: false,
  hasGyroscope: false,
  hasRadar: false,
  hasGPS: false,
  hasObstacleSensors: false,
  hasUltraSonicAltimeter: false,
  description: '',
  imageUrl: '',
  mileage: '', // number
  specificationContent: '',
  specificationImageUrl: '',
  specificationPDFUrl: '',
};

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'EditDrones/LOADED';
export const UPDATED = 'EditDrones/UPDATED';

// ------------------------------------
// Actions
// ------------------------------------
export const load = (id) => async(dispatch) => {
  let drone = _.clone(defaultDrone);

  if (id) {
    drone = await APIService.fetchProviderDrone(id);
    drone = _.pick(drone, [..._.keys(defaultDrone), 'id']);
  }

  dispatch({type: LOADED, payload: {drone}});
};

export const save = (values) => async (dispatch, getState) => {
  let drone = {...getState().editDrones.drone, ...values};

  // don't send empty strings to the server
  drone = _.pickBy(drone, (value) => !_.isString(value) || value.trim() !== '');

  // as long as server doesn't support file updaload for now, we send only filenames for now
  drone = _.mapValues(drone, (value, key) => {
    let newValue = value;

    if (_.includes(['imageUrl', 'specificationImageUrl', 'specificationPDFUrl'], key)) {
      newValue = typeof value !== 'undefined' && value.length ? value[0].name : value;
    }

    return newValue;
  });

  if (drone.id) {
    drone = await APIService.updateProviderDrone(drone.id, drone);
    drone = _.pick(drone, [..._.keys(defaultDrone), 'id']);
    dispatch({type: UPDATED, payload: {drone}});
    toastr.success('Drone saved');
  } else {
    drone = await APIService.createProviderDrone(drone);
    dispatch(push(`/edit-drones/${drone.id}`));
    toastr.success('Drone created');
  }
};

export const cancel = () => async (dispatch, getState) => {
  const drone = getState().editDrones.drone;

  if (drone.id) {
    dispatch(push(`/drone-details/${drone.id}`));
  } else {
    dispatch(push('/my-drone'));
  }
};

export const sendRequest = (values) => new Promise((resolve) => {
  alert(JSON.stringify(values, null, 2));
  resolve();
});


export const actions = {
  load,
  save,
  cancel,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOADED]: (state, action) => ({
    ...state, drone: action.payload.drone,
  }),
}, {
  drone: null,
});
