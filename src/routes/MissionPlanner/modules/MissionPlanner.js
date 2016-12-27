import { handleActions } from 'redux-actions';
import { push } from 'react-router-redux';
import _ from 'lodash';
import APIService from 'services/APIService';
import { getUID, poluteMissionWithUID, cloneMissionUID, clearMissionUID } from './utils/missionUID.js';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'MissionPlanner/LOADED';
export const CREATED = 'MissionPlanner/CREATED';
export const UPDATED = 'MissionPlanner/UPDATED';
export const UPDATE_MISSION_ITEM = 'MissionPlanner/UPDATE_MISSION_ITEM';
export const ADD_MISSION_ITEM = 'MissionPlanner/ADD_MISSION_ITEM';
export const DELETE_MISSION_ITEM = 'MissionPlanner/DELETE_MISSION_ITEM';
export const CLEAR_MISSION = 'MissionPlanner/CLEAR_MISSION';
export const UPDATE_MISSION_NAME = 'MissionPlanner/UPDATE_MISSION_NAME';

// ------------------------------------
// Actions
// ------------------------------------
export const load = (id) => async(dispatch) => {
  let mission = {
    missionName: '',
    plannedHomePosition: null,
    missionItems: [],
    status: 'waiting',
  };

  if (id) {
    mission = await APIService.getMission(id);
  }

  /*
    As missionItems and plannedHomePosition don't have their own native uniqe identifiers inside a mission
    we will add custom unique ids to use them later as "key" property to prevent rerendering
  */
  mission = poluteMissionWithUID(mission);
  dispatch({ type: LOADED, payload: { mission } });
};

export const save = () => async (dispatch, getState) => {
  const id = getState().missionPlanner.mission.id;
  const missionToSave = _.pick(
    getState().missionPlanner.mission, [
      'missionName',
      'plannedHomePosition',
      'missionItems',
      'status',
    ]
  );

  if (id) {
    /*
      Clear mission from UIDs before sending to the server with clearMissionUID
    */
    let mission = await APIService.updateMission(id, clearMissionUID(missionToSave));
    /*
      When we update mission, we send a mission to the server and get it back from the server
      we load mission which we got from the server to be in sync
      but to prevent redrawing we copy uids
    */
    mission = cloneMissionUID(missionToSave, mission);
    dispatch({ type: UPDATED, payload: { mission } });
  } else {
    await APIService.createMission(missionToSave);
    dispatch({ type: CREATED });
    dispatch(push('/mission-list'));
  }
};

export const updateMissionItem = (id, missionItem) => async (dispatch) => {
  dispatch({ type: UPDATE_MISSION_ITEM, payload: { id, missionItem } });
};

export const addMissionItem = (markerPosition) => async (dispatch, getState) => {
  const uids = [getUID()];
  // in case there are no points yet and we will add home point and take off point together
  // we have to supply two uniqe ids
  if (!getState().missionPlanner.mission.plannedHomePosition) {
    uids.push(getUID());
  }
  dispatch({ type: ADD_MISSION_ITEM, payload: { markerPosition, uids } });
};

export const deleteMissionItem = (missionItemId) => async (dispatch) => {
  dispatch({ type: DELETE_MISSION_ITEM, payload: { missionItemId } });
};

export const clearMission = () => async (dispatch) => {
  dispatch({ type: CLEAR_MISSION });
};

export const updateMissionName = (missionName) => async (dispatch) => {
  dispatch({ type: UPDATE_MISSION_NAME, payload: { missionName } });
};

export const actions = {
  load,
  save,
  updateMissionItem,
  addMissionItem,
  deleteMissionItem,
  clearMission,
  updateMissionName,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOADED]: (state, { payload: { mission } }) => {
    const newState = _.cloneDeep(state);

    newState.mission = mission;

    return newState;
  },
  [UPDATED]: (state, { payload: { mission } }) => {
    const newState = _.cloneDeep(state);

    newState.mission = mission;

    return newState;
  },
  [UPDATE_MISSION_ITEM]: (state, { payload: { id, missionItem } }) => {
    const newState = _.cloneDeep(state);

    if (id === 0) {
      newState.mission.plannedHomePosition = missionItem;
    } else {
      newState.mission.missionItems[id - 1] = missionItem;
    }
    return newState;
  },
  [ADD_MISSION_ITEM]: (state, { payload: { markerPosition, uids } }) => {
    const newState = _.cloneDeep(state);
    const missionItem = {
      uid: uids[0], // use first uid
      autoContinue: true,
      command: 16,
      coordinate: [
        markerPosition.lat,
        markerPosition.lng,
        0,
      ],
      frame: 0,
      id: 0,
      param1: 0,
      param2: 0,
      param3: 0,
      param4: 0,
      type: 'missionItem',
    };

    // if not home point yet - add it
    if (!state.mission.plannedHomePosition) {
      newState.mission.plannedHomePosition = {
        ..._.cloneDeep(missionItem),
        uid: uids[1], // in this case we need the second uid
      };
    }

    // it's a take-off point
    if (newState.mission.missionItems.length === 0) {
      const takeoffItem = {
        ..._.cloneDeep(missionItem),
        id: 1,
        command: 22,
      };
      newState.mission.missionItems.push(takeoffItem);
    // for regular waypoints
    } else {
      missionItem.id = newState.mission.missionItems.length + 1;
      newState.mission.missionItems.push(missionItem);
    }

    return newState;
  },
  [DELETE_MISSION_ITEM]: (state, { payload: { missionItemId } }) => {
    const newState = _.cloneDeep(state);

    // cannot delete home point, only missionItems
    if (missionItemId > 0) {
      newState.mission.missionItems.splice(missionItemId - 1, 1);
      newState.mission.missionItems = newState.mission.missionItems.map((missionItem, index) => {
        const updatedItem = _.cloneDeep(missionItem);

        // set tekeoff point command
        if (index === 0) {
          updatedItem.command = 22;
        }
        // renumber items
        updatedItem.id = index + 1;

        return updatedItem;
      });
    }

    return newState;
  },
  [CLEAR_MISSION]: (state) => {
    const newState = _.cloneDeep(state);

    newState.mission.plannedHomePosition = null;
    newState.mission.missionItems = [];

    return newState;
  },
  [UPDATE_MISSION_NAME]: (state, { payload: { missionName } }) => {
    const newState = _.cloneDeep(state);

    newState.mission.missionName = missionName;

    return newState;
  },
}, {
  mission: {
    id: '',
    missionName: '',
    plannedHomePosition: null,
    missionItems: [],
    status: 'waiting',
  },
});
