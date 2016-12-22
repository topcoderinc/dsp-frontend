import {handleActions, createAction} from 'redux-actions';

// ------------------------------------
// Actions
// ------------------------------------


export const sendRequest = (values) => new Promise((resolve) => {
  alert(JSON.stringify(values, null, 2));
  resolve();
});

export const toggleFilter = createAction('TOGGLE_FILTER');

export const actions = {
  toggleFilter,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [toggleFilter]: (state, action) => ({
    ...state, toggleFilterValue: action.payload,
  }),
}, {
  // initial data
  providers: [
    {imgSrc: 'drone-1.png', droneName: 'Drone Maniac', completedJob: 21, sponsored: true, hasBadge: true},
    {imgSrc: 'drone-2.png', droneName: 'Pro Flying', completedJob: 20, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-3.png', droneName: 'XtremeDrone', completedJob: 21, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-4.png', droneName: 'Drone Maniac', completedJob: 11, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-3.png', droneName: 'XtremeDrone', completedJob: 21, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-2.png', droneName: 'Pro Flying', completedJob: 31, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-1.png', droneName: 'Drone Maniac', completedJob: 25, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-1.png', droneName: 'XtremeDrone', completedJob: 22, sponsored: true, hasBadge: true},
    {imgSrc: 'drone-2.png', droneName: 'Drone Maniac', completedJob: 21, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-3.png', droneName: 'Pro Flying', completedJob: 21, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-4.png', droneName: 'Drone Maniac', completedJob: 41, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-3.png', droneName: 'XtremeDrone', completedJob: 21, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-2.png', droneName: 'Drone Maniac', completedJob: 21, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-1.png', droneName: 'Pro Flying', completedJob: 21, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-1.png', droneName: 'Drone Maniac', completedJob: 21, sponsored: true, hasBadge: true},
    {imgSrc: 'drone-2.png', droneName: 'XtremeDrone', completedJob: 31, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-3.png', droneName: 'Drone Maniac', completedJob: 21, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-4.png', droneName: 'Drone Maniac', completedJob: 21, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-3.png', droneName: 'XtremeDrone', completedJob: 33, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-2.png', droneName: 'Drone Maniac', completedJob: 21, sponsored: false, hasBadge: true},
    {imgSrc: 'drone-1.png', droneName: 'Pro Flying', completedJob: 21, sponsored: false, hasBadge: true},
  ],

  providersLocation: [
    {lat: -6.215415, lng: 106.846890},
    {lat: -6.222582, lng: 106.867146},
    {lat: -6.211319, lng: 106.868606},
    {lat: -6.203811, lng: 106.840539},
    {lat: -6.213965, lng: 106.832042},
    {lat: -6.199374, lng: 106.837449},
  ],

  currentLocation: [
    {lat: -6.206200, lng: 106.846290},
  ],
});
