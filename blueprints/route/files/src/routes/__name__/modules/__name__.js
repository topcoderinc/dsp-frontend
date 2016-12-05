import {createAction, handleActions} from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const SAMPLE = '<%= pascalEntityName %>/SAMPLE';

// ------------------------------------
// Actions
// ------------------------------------


export const sample2 = () => async (dispatch, getState) => {

};

export const actions = {
  sample: createAction(SAMPLE),
  sample2,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SAMPLE]: (state, {payload}) => state,
}, {});
