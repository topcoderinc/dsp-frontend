import { handleActions } from 'redux-actions';


// ------------------------------------
// Actions
// ------------------------------------


export const sendRequest = (values) => new Promise((resolve) => {
  alert(JSON.stringify(values, null, 2));
  resolve();
});


export const actions = {
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({

}, {
  // initial data


});
