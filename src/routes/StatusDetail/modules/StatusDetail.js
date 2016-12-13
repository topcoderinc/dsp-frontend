import { handleActions } from 'redux-actions';
import APIService from 'services/APIService';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'StatusDetail/LOADED';
export const SET_CURRENT_GRAPH_TYPE = 'StatusDetail/SET_CURRENT_GRAPH_TYPE';
export const OPEN_RATE_MODAL = 'StatusDetail/OPEN_RATE_MODAL';
export const CLOSE_RATE_MODAL = 'StatusDetail/CLOSE_RATE_MODAL';
export const SEND_RATE = 'StatusDetail/SEND_RATE';

// ------------------------------------
// Actions
// ------------------------------------
export const load = (id) => async(dispatch) => {
  const statusDetail = await APIService.getStatusDetail(id);

  dispatch({ type: LOADED, payload: statusDetail });
};

export const setCurrentGraphType = (currentGraphType) => async(dispatch) => {
  dispatch({ type: SET_CURRENT_GRAPH_TYPE, payload: currentGraphType });
};

export const openRateModal = () => async(dispatch) => {
  dispatch({ type: OPEN_RATE_MODAL, payload: true });
};

export const closeRateModal = () => async(dispatch) => {
  dispatch({ type: CLOSE_RATE_MODAL, payload: false });
};

// send rate and comment here
/* eslint-disable no-unused-vars */
export const sendRate = ({ rate, comment }) => async(dispatch) => {
  dispatch({ type: CLOSE_RATE_MODAL, payload: false });
};
/* eslint-enable no-unused-vars */

export const actions = {
  load,
  setCurrentGraphType,
  openRateModal,
  closeRateModal,
  sendRate,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOADED]: (state, { payload: statusDetail }) => ({ ...state, ...statusDetail }),
  [SET_CURRENT_GRAPH_TYPE]: (state, { payload: currentGraphType }) => ({ ...state, currentGraphType }),
  [OPEN_RATE_MODAL]: (state, { payload: isRateModalOpen }) => ({ ...state, isRateModalOpen }),
  [CLOSE_RATE_MODAL]: (state, { payload: isRateModalOpen }) => ({ ...state, isRateModalOpen }),
}, {
  currentGraphType: 'speed',
  isRateModalOpen: false,
});
