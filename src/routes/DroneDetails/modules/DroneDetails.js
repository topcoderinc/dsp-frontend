import {handleActions} from 'redux-actions';
import {push} from 'react-router-redux';
import moment from 'moment';
import APIService from 'services/APIService';
import {toastr} from 'react-redux-toastr';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'DroneDetails/LOADED';
export const CHANGE_SCHEDULE_MONTH = 'DroneDetails/CHANGE_SCHEDULE_MONTH';
export const LOAD_SCHEDULE_MONTH = 'DroneDetails/LOAD_SCHEDULE_MONTH';
export const SELECT_SCHEDULE_DAY = 'DroneDetails/SELECT_SCHEDULE_DAY';
export const LOAD_SCHEDULE_DAY = 'DroneDetails/LOAD_SCHEDULE_DAY';

// ------------------------------------
// Actions
// ------------------------------------
export const load = (id) => async(dispatch, getState) => {
  const currentState = getState().droneDetails;

  const drone = await APIService.fetchProviderDrone(id);
  const lastMissions = await APIService.fetchProviderDroneMissions(id, {limit: 4, status: 'completed'});
  const scheduleMonthMissions = await APIService.fetchProviderDroneMonthMissions(id, currentState.scheduleMonth.format('YYYY-MM-DD'));

  dispatch({type: LOADED, payload: {drone, lastMissions, scheduleMonthMissions}});
};

export const changeMonth = (scheduleMonth) => async(dispatch, getState) => {
  dispatch({type: CHANGE_SCHEDULE_MONTH, payload: {scheduleMonth}});

  const scheduleMonthMissions = await APIService.fetchProviderDroneMonthMissions(
    getState().droneDetails.drone.id,
    scheduleMonth.format('YYYY-MM-DD')
  );

  dispatch({type: LOAD_SCHEDULE_MONTH, payload: {scheduleMonthMissions}});
};

export const selectScheduleDay = (scheduleDay) => async(dispatch, getState) => {
  dispatch({type: SELECT_SCHEDULE_DAY, payload: {scheduleDay}});

  const scheduleDayMissions = await APIService.fetchProviderDroneMissions(
    getState().droneDetails.drone.id,
    {date: scheduleDay.format('YYYY-MM-DD')}
  );

  dispatch({type: LOAD_SCHEDULE_DAY, payload: {scheduleDayMissions}});
};

export const deleteDrone = () => async(dispatch, getState) => {
  await APIService.deleteProviderDrone(getState().droneDetails.drone.id);

  toastr.success('Drone deleted');
  dispatch(push('/my-drone'));
};

export const actions = {
  load,
  changeMonth,
  selectScheduleDay,
  deleteDrone,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOADED]: (state, action) => ({
    ...state, ...action.payload,
  }),
  [CHANGE_SCHEDULE_MONTH]: (state, action) => ({
    ...state, scheduleMonth: action.payload.scheduleMonth,
  }),
  [LOAD_SCHEDULE_MONTH]: (state, action) => ({
    ...state, scheduleMonthMissions: action.payload.scheduleMonthMissions,
  }),
  [SELECT_SCHEDULE_DAY]: (state, action) => ({
    ...state, scheduleDay: action.payload.scheduleDay,
  }),
  [LOAD_SCHEDULE_DAY]: (state, action) => ({
    ...state, scheduleDayMissions: action.payload.scheduleDayMissions,
  }),
}, {
  drone: null,
  lastMissions: [],
  scheduleMonth: moment(),
  scheduleDay: null,
  scheduleMonthMissions: [],
  scheduleDayMissions: [],
});
