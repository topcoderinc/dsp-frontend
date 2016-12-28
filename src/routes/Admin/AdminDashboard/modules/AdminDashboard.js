import {createAction, handleActions} from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const SAMPLE = 'AdminDashboard/SAMPLE';

// ------------------------------------
// Actions
// ------------------------------------


export const sample2 = () => async (dispatch, getState) => {
  getState(); // to pass eslint from the begining
};

export const actions = {
  sample: createAction(SAMPLE),
  sample2,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SAMPLE]: (state, {payload}) => {
    payload; // to pass eslint from the begining
    return state;
  },
}, {});
