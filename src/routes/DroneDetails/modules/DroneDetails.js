import { handleActions, createAction } from 'redux-actions';
import Reactable from 'Reactable';
import moment from 'moment';

const unsafe = Reactable.unsafe;
const now = moment();
const format = 'dddd, MMMM DD, YYYY';
const today = now.format(format);

// ------------------------------------
// Actions
// ------------------------------------
export const selectedDate = createAction('SELECTED_DATE');


export const sendRequest = (values) => new Promise((resolve) => {
  alert(JSON.stringify(values, null, 2));
  resolve();
});

export const actions = {
  selectedDate,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [selectedDate]: (state, action) => ({
    ...state, selectedCalenderDate: action.payload,
  }),
}, {
  // initial data
  selectedCalenderDate: today,
  droneInfoDetails: {
    droneName: 'Drone name lorem ipsum',
    droneSerialNum: '#123456789ABC',
    description1: 'assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.',
    description2: 'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.',
  },
  LastCompletedMissionsData: [
    {routeImg: 'route-1.png', missionTitle: 'Lorem Ipsum Mission Title', id: '123456789ABC', type: 'Simple Delivery', date: '10/24/2016  09:30 AM', location: 'Street address lorem...'},
    {routeImg: 'route-1.png', missionTitle: 'Lorem Ipsum Mission Title', id: '123456789ABC', type: 'Simple Delivery', date: '10/24/2016  09:30 AM', location: 'Street address lorem...'},
    {routeImg: 'route-1.png', missionTitle: 'Lorem Ipsum Mission Title', id: '123456789ABC', type: 'Simple Delivery', date: '10/24/2016  09:30 AM', location: 'Street address lorem...'},
    {routeImg: 'route-1.png', missionTitle: 'Lorem Ipsum Mission Title', id: '123456789ABC', type: 'Simple Delivery', date: '10/24/2016  09:30 AM', location: 'Street address lorem...'},
  ],

  scheduleTableData: [
    {
      'Scheduled Launch Time': '08:00 AM',
      'Drone Serial Number': '123456789ABC',
      'Service Type': 'Simple delivery',
      'Pick-up Location': unsafe('Street address lorem ipsum <br>City, State 12345'),
      'Drop-off Location': unsafe('Street address lorem ipsum <br>City, State 12345'),
      'What to deliver / Weight': 'Object lorem ipsum / 9.99 lbs',
    },
    {
      'Scheduled Launch Time': '08:00 AM',
      'Drone Serial Number': '123456789ABC',
      'Service Type': 'Simple delivery',
      'Pick-up Location': unsafe('Street address lorem ipsum <br>City, State 12345'),
      'Drop-off Location': unsafe('Street address lorem ipsum <br>City, State 12345'),
      'What to deliver / Weight': 'Object lorem ipsum / 9.99 lbs',
    },
    {
      'Scheduled Launch Time': '08:00 AM',
      'Drone Serial Number': '123456789ABC',
      'Service Type': 'Simple delivery',
      'Pick-up Location': unsafe('Street address lorem ipsum <br>City, State 12345'),
      'Drop-off Location': unsafe('Street address lorem ipsum <br>City, State 12345'),
      'What to deliver / Weight': 'Object lorem ipsum / 9.99 lbs',
    },
    {
      'Scheduled Launch Time': '08:00 AM',
      'Drone Serial Number': '123456789ABC',
      'Service Type': 'Simple delivery',
      'Pick-up Location': unsafe('Street address lorem ipsum <br>City, State 12345'),
      'Drop-off Location': unsafe('Street address lorem ipsum <br>City, State 12345'),
      'What to deliver / Weight': 'Object lorem ipsum / 9.99 lbs',
    },
    {
      'Scheduled Launch Time': '08:00 AM',
      'Drone Serial Number': '123456789ABC',
      'Service Type': 'Simple delivery',
      'Pick-up Location': unsafe('Street address lorem ipsum <br>City, State 12345'),
      'Drop-off Location': unsafe('Street address lorem ipsum <br>City, State 12345'),
      'What to deliver / Weight': 'Object lorem ipsum / 9.99 lbs',
    },

  ],

  droneSpecifications: {
    RateOfClimb: '7.0 m/s',
    OperatingSpeed: '8.0 m/s',
    MaximumThrust: '15.5 N',
    Weight: 'ca. 800 g (depending on configuration)',
    RecommendedLoad: '150 g',
    MaximumLoad: '250 g',
    MaximumLakeOffWeight: '1,100 g',
    Dimensions: '540 mm',
    Battery: '14.8 V, 4S LiPo, 2300 mAh',
    FlatCoreMotors: 'yes',
    CFDOptimisedPropeller: 'yes',
    ClosedCarbonHousing: 'yes',
    IP43Protection: 'yes',
  },

  droneBenefits: [
    'Up to 30 minutes flying time',
    'Rain-resistant, dust-resistant',
    'Extremely resistant to cold',
    'Extremely resistant to heat',
    'Flat core motors',
    'CFD-optimised propeller',
    'Less time needed to train crews',
    'Low maintenance costs',
    'Low service costs',
    'Lower costs compared to helicopters',
    'Low noise electric motor',
    'Lower air turbulence',
  ],

});
