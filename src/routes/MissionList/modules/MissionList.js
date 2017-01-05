import {handleActions} from 'redux-actions';
import _ from 'lodash';
import APIService from 'services/APIService';
import {toastr} from 'react-redux-toastr';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'MissionList/LOADED';

// ------------------------------------
// Actions
// ------------------------------------
export const load = (params) => async(dispatch, getState) => {
  const allParams = {..._.pick(getState().missionList, ['offset', 'limit']), ...params};

  const respond = await APIService.fetchMissionList(allParams);

  dispatch({type: LOADED, payload: {missions: respond.items, total: respond.total, ...params}});
};

export const deleteMission = (id) => async(dispatch) => {
  await APIService.deleteMission(id);
  toastr.success('Mission deleted');

  dispatch(load());
};

export const actions = {
  load,
  deleteMission,
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
  missions: [],
});
