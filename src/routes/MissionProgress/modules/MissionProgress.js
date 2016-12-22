import {handleActions, createAction} from 'redux-actions';


// ------------------------------------
// Actions
// ------------------------------------


export const sendRequest = (values) => new Promise((resolve) => {
  alert(JSON.stringify(values, null, 2));
  resolve();
});

export const markAsComplete = createAction('MARK_AS_COMPLETE');

export const actions = {
  markAsComplete,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [markAsComplete]: (state, action) => ({
    ...state, statusName: action.payload,
  }),
}, {
  statusName: 'In Progress',
  droneDetails: {
    droneSerialNum: '123456789ABC',
    droneName: 'XtremeDrone',
    droneType: 'Drone type lorem',
    timeOfLanunch: '18 Oct 2016  08:00 AM',
    arrivalTime: '18 Oct 2016  10:00 AM',
    avarageSpeed: '9.9 mph',
  },
  estimations: {
    timeOfLanunch: 'Jul 20,2016, 10:00AM',
    speed: 40,
    distance: '15 miles',
    time: '20 min',
  },
  requestDetail: {
    serviceType: 'Simple delivery',
    packageType: 'Package Lorem Ipsum',
    whatIsBeingDelivered: 'Delivery object lorem ipsum',
    weight: '9.99 lbs',
    requestedDeliveryTime: '18 Oct 2016  10:00 AM',
    pickUpLocation: {
      streetAddress: 'Street address lorem',
      city: 'City',
      State: 'State',
      zip: '12345',
    },
    dropOffLocation: {
      streetAddress: 'Street address lorem',
      city: 'City',
      State: 'State',
      zip: '12345',
    },
    estimatedDistance: '99.99 miles',
  },
  contactInfo: {
    name: 'James Smith',
    address: {
      streetAddress: 'Street address lorem',
      city: 'City',
      State: 'State',
      zip: '12345',
    },
    phoneNum: '123-456-7899',
    email: 'email@email.com',
  },
  doneCoords: {
    lat: 38.904042,
    lng: -77.034749,
  },
  wayPoints: [
    {

      lat: 38.9081,
      lng: -77.033526,
    },
    {
      lat: 38.906947,

      lng: -77.031337,
    },
    {
      lat: 38.904109,
      lng: -77.0305,
    },
    {
      lat: 38.904242,
      lng: -77.034749,
    },
    {
      lat: 38.903207,
      lng: -77.03771,
    },
    {
      lat: 38.90451,
      lng: -77.040693,
    },
  ],
  distance: '8 km',

  missionSlides: [
    {imagSrc: 'slide-1.png'},
    {imagSrc: 'slide-2.png'},
    {imagSrc: 'slide-3.png'},
    {imagSrc: 'slide-4.png'},
    {imagSrc: 'slide-5.png'},
    {imagSrc: 'slide-6.png'},
    {imagSrc: 'slide-7.png'},
    {imagSrc: 'slide-8.png'},
    {imagSrc: 'slide-9.png'},
    {imagSrc: 'slide-10.png'},
    {imagSrc: 'slide-11.png'},
    {imagSrc: 'slide-12.png'},
    {imagSrc: 'slide-1.png'},
    {imagSrc: 'slide-2.png'},
    {imagSrc: 'slide-3.png'},
    {imagSrc: 'slide-4.png'},
    {imagSrc: 'slide-5.png'},
    {imagSrc: 'slide-6.png'},

  ],
});
