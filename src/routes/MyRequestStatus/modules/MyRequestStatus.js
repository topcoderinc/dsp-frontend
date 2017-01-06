import {handleActions} from 'redux-actions';
import APIService from 'services/APIService';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'MyRequestStatus/LOADED';

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

export const actions = {
  load,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOADED]: (state, {payload: {requests, filterByStatus}}) => ({...state, requests, filterByStatus}),
}, {
  filterByStatus: 'all',
  requests: [],
});
