import {handleActions} from 'redux-actions';
import APIService from 'services/APIService';
import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'PilotMissions/LOADED';
export const DRONE_CHECK_STATUS_ACTION = 'PilotMissions/DRONE_CHECK_STATUS_ACTION';

// ------------------------------------
// Actions
// ------------------------------------
export const load = (params) => async(dispatch, getState) => {
  const allParams = {..._.pick(getState().pilotMissions, ['offset', 'limit', 'sortBy']), ...params};
  if (!allParams.sortBy) {
    delete allParams.sortBy;
  }

  const respond = await APIService.fetchPilotMissions(allParams);

  dispatch({type: LOADED, payload: {missions: respond.items, total: respond.total, ...params}});
};

export const droneCheckStatus = (missionId) => async(dispatch) => {
  const status = await APIService.checkDroneStatusForMission(missionId);
  const droneStatus = {};
  droneStatus[missionId] = status;
  dispatch({type: DRONE_CHECK_STATUS_ACTION, payload: {droneStatus, missionId}});
};

export const actions = {
  load,
  droneCheckStatusHandler: droneCheckStatus,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOADED]: (state, {payload}) => ({...state, ...payload}),
  [DRONE_CHECK_STATUS_ACTION]: (state, {payload}) => {
    const newState = _.cloneDeep(state);
    let isOpen = !newState.statusModalOpen[payload.missionId];
    if (_.isUndefined(isOpen)) {
      isOpen = true;
    }

    newState.droneStatus = payload.droneStatus;
    newState.statusModalOpen = {};
    newState.statusModalOpen[payload.missionId] = isOpen;
    return newState;
  },
}, {
  offset: 0,
  limit: 10,
  total: 0,
  sortBy: 'missionName',
  missions: [],
  droneStatus: {},
  statusModalOpen: {},
});
