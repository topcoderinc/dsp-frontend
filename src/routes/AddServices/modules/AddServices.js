import {handleActions, createAction} from 'redux-actions';


// ------------------------------------
// Actions
// ------------------------------------
export const addPackagesAction = createAction('ADD_PACKAGES');


export const sendRequest = (values) => new Promise((resolve) => {
  alert(JSON.stringify(values, null, 2));
  resolve();
});


export const actions = {
  addPackagesAction,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [addPackagesAction]: (state, action) => ({
    ...state, addPackages: [...state.addPackages, action.payload],
  }),
}, {
  // initial data
  addPackages: [
    {
      packageName: '',
      discription: '',
      packagePrice: '',
      discount: '',
    },
  ],

});
