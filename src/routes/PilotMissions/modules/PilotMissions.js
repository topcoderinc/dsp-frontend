import {handleActions} from 'redux-actions';
import APIService from 'services/APIService';
import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'PilotMissions/LOADED';

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

export const actions = {
  load,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOADED]: (state, {payload}) => ({...state, ...payload}),
}, {
  offset: 0,
  limit: 10,
  total: 0,
  sortBy: 'missionName',
  missions: [],
});
