import { handleActions } from 'redux-actions';
import APIService from 'services/APIService';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'MyRequestStatus/LOADED';

// ------------------------------------
// Actions
// ------------------------------------
export const load = (filterByStatus = 'all') => async(dispatch) => {
  const requests = await APIService.fetchMyRequestStatus(filterByStatus);

  dispatch({ type: LOADED, payload: { requests, filterByStatus } });
};

export const actions = {
  load,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOADED]: (state, { payload: { requests, filterByStatus } }) => ({ ...state, requests, filterByStatus }),
}, {
  filterByStatus: 'all',
});
