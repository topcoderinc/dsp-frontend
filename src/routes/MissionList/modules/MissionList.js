import {handleActions} from 'redux-actions';
import _ from 'lodash';
import APIService from 'services/APIService';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'MissionList/LOADED';
export const DELETE_MISSION = 'MissionList/DELETE_MISSION';

// ------------------------------------
// Actions
// ------------------------------------
export const load = () => async(dispatch) => {
  const missions = await APIService.fetchMissionList();
  dispatch({type: LOADED, payload: {missions}});
};

export const deleteMission = (id) => async(dispatch) => {
  await APIService.deleteMission(id);

  dispatch({type: DELETE_MISSION, payload: {missionId: id}});
};

export const actions = {
  load,
  deleteMission,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOADED]: (state, {payload: {missions}}) => ({...state, missions}),
  [DELETE_MISSION]: (state, {payload: {missionId}}) => {
    const newState = _.cloneDeep(state);

    newState.missions = newState.missions.filter((mission) => mission.id !== missionId);

    return newState;
  },
}, {
  missions: [],
});
