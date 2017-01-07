import {handleActions} from 'redux-actions';
import _ from 'lodash';
import APIService from 'services/APIService';
import {toastr} from 'react-redux-toastr';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'MyDrone/LOADED';
export const UPDATE_DRONE_TABLE = 'MyDrone/UPDATE_DRONE_TABLE';
export const SET_LIMIT = 'MyDrone/SET_LIMIT';
export const SET_OFFSET = 'MyDrone/SET_OFFSET';
export const SET_SORT_BY = 'MyDrone/SET_SORT_BY';
export const SET_CURRENT_TAB = 'MyDrone/SET_CURRENT_TAB';

// ------------------------------------
// Actions
// ------------------------------------
export const load = () => async(dispatch, getState) => {
  const query = _.pick(getState().myDrone, ['limit', 'offset', 'sortBy']);

  const dronesCurrentLocations = await APIService.fetchDronesCurrentLocations();
  const availableDrones = await APIService.searchProviderDrones({...query, statuses: 'idle-ready'});
  const onMissionDrones = await APIService.searchProviderDrones({...query, statuses: 'idle-busy,in-motion'});

  dispatch({
    type: LOADED,
    payload: {
      dronesCurrentLocations,
      availableDrones,
      onMissionDrones,
    },
  });
};

export const updateDroneTable = (filter) => async(dispatch, getState) => {
  const prevState = getState().myDrone;
  const newState = {...prevState, ...filter};
  const {currentTab, limit, sortBy} = newState;
  let {offset} = newState;

  if (_.has(filter, 'currentTab')) {
    // reset page to 0 when change tab
    offset = 0;
    dispatch({type: SET_OFFSET, payload: offset});

    dispatch({type: SET_CURRENT_TAB, payload: currentTab});
  }
  if (_.has(filter, 'limit')) {
    // adjust page number (offset) when change per page quantity (limit)
    offset = Math.floor(prevState.offset / limit);
    dispatch({type: SET_OFFSET, payload: offset});

    dispatch({type: SET_LIMIT, payload: limit});
  }
  if (_.has(filter, 'offset')) {
    dispatch({type: SET_OFFSET, payload: offset});
  }
  if (_.has(filter, 'sortBy')) {
    dispatch({type: SET_SORT_BY, payload: sortBy});
  }

  const query = {limit, offset, sortBy};
  const payload = {};

  if (currentTab === 'available') {
    payload.availableDrones = await APIService.searchProviderDrones({...query, statuses: 'idle-ready'});
  } else if (currentTab === 'onMission') {
    payload.onMissionDrones = await APIService.searchProviderDrones({...query, statuses: 'idle-busy,in-motion'});
  }

  dispatch({type: UPDATE_DRONE_TABLE, payload});
};

export const deleteDrone = (id) => async(dispatch, getState) => {
  const currentState = getState().myDrone;
  const query = _.pick(currentState, ['limit', 'offset', 'sortBy']);
  const currentTab = currentState.currentTab;
  const payload = {};
  const totalDronsOnCurrentTab = currentTab === 'available' ? currentState.availableDrones.total : currentState.onMissionDrones.total;

  await APIService.deleteProviderDrone(id);

  toastr.success('Drone deleted');

  // if we delete the last drone on the page on the current tab, switch page to previous one
  if (totalDronsOnCurrentTab === query.offset + 1) {
    query.offset = Math.max(query.offset - query.limit, 0);
    dispatch({type: SET_OFFSET, payload: query.offset});
  }

  if (currentTab === 'available') {
    payload.availableDrones = await APIService.searchProviderDrones({...query, statuses: 'idle-ready'});
  } else if (currentTab === 'onMission') {
    payload.onMissionDrones = await APIService.searchProviderDrones({...query, statuses: 'idle-busy,in-motion'});
  }

  dispatch({type: UPDATE_DRONE_TABLE, payload});
};

export const actions = {
  load,
  updateDroneTable,
  deleteDrone,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOADED]: (state, action) => ({
    ...state, ...action.payload,
  }),
  [SET_LIMIT]: (state, action) => ({...state, limit: action.payload}),
  [SET_OFFSET]: (state, action) => ({...state, offset: action.payload}),
  [SET_SORT_BY]: (state, action) => ({...state, sortBy: action.payload}),
  [SET_CURRENT_TAB]: (state, action) => ({...state, currentTab: action.payload}),
  [UPDATE_DRONE_TABLE]: (state, action) => ({...state, ...action.payload}),
}, {
  currentTab: 'available',
  limit: 10,
  offset: 0,
  sortBy: 'serialNumber',
  dronesCurrentLocations: [],
  availableDrones: {total: 0, items: []},
  onMissionDrones: {total: 0, items: []},
});
