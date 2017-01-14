import {handleActions} from 'redux-actions';
import APIService from 'services/APIService';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'MyRequestStatus/LOADED';
export const PACKAGES_LOADED = 'MyRequestStatus/PACKAGES_LOADED';

// ------------------------------------
// Actions
// ------------------------------------
export const load = (filterByStatus = 'all') => async(dispatch) => {
  const res = await APIService.fetchMyRequestStatus(filterByStatus === 'all' ? undefined : filterByStatus); // eslint-disable-line no-undefined
  const requests = res.map((r) => ({
    id: r.id,
    status: r.status === 'in-progress' ? 'inProgress' : r.status,
    timeOflaunch: r.launchDate,
    provider: r.provider.name,
    title: r.title,
  }));

  dispatch({
    type: LOADED,
    payload: {
      requests,
      filterByStatus,
    },
  });
};

export const searchPackages = () => (dispatch) => APIService.searchPackages({limit: -1}).then(({items}) => {
  dispatch({
    type: PACKAGES_LOADED,
    payload: {
      availablePackages: items,
    },
  });
});

export const actions = {
  load,
  searchPackages,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOADED]: (state, {payload: {requests, filterByStatus}}) => ({...state, requests, filterByStatus}),
  [PACKAGES_LOADED]: (state, {payload}) => ({...state, ...payload}),
}, {
  filterByStatus: 'all',
  requests: [],
  availablePackages: [],
});
