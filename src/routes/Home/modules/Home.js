import { handleActions, createAction } from 'redux-actions';

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
  popularDrones: [
  	{imgSrc: 'drone-1.png', droneName: 'Drone Maniac', completedJob: 21, sponsored: true},
  	{imgSrc: 'drone-2.png', droneName: 'Pro Flying', completedJob: 20, sponsored: false},
  	{imgSrc: 'drone-3.png', droneName: 'XtremeDrone', completedJob: 21, sponsored: false},
  	{imgSrc: 'drone-4.png', droneName: 'Drone Maniac', completedJob: 11, sponsored: false},
  	{imgSrc: 'drone-3.png', droneName: 'XtremeDrone', completedJob: 21, sponsored: false},
  	{imgSrc: 'drone-2.png', droneName: 'Pro Flying', completedJob: 31, sponsored: false},
  	{imgSrc: 'drone-1.png', droneName: 'Drone Maniac', completedJob: 25, sponsored: false},
    {imgSrc: 'drone-1.png', droneName: 'XtremeDrone', completedJob: 22, sponsored: true},
    {imgSrc: 'drone-2.png', droneName: 'Drone Maniac', completedJob: 21, sponsored: false},
    {imgSrc: 'drone-3.png', droneName: 'Pro Flying', completedJob: 21, sponsored: false},
    {imgSrc: 'drone-4.png', droneName: 'Drone Maniac', completedJob: 41, sponsored: false},
    {imgSrc: 'drone-3.png', droneName: 'XtremeDrone', completedJob: 21, sponsored: false},
    {imgSrc: 'drone-2.png', droneName: 'Drone Maniac', completedJob: 21, sponsored: false},
    {imgSrc: 'drone-1.png', droneName: 'Pro Flying', completedJob: 21, sponsored: false},
    {imgSrc: 'drone-1.png', droneName: 'Drone Maniac', completedJob: 21, sponsored: true},
    {imgSrc: 'drone-2.png', droneName: 'XtremeDrone', completedJob: 31, sponsored: false},
    {imgSrc: 'drone-3.png', droneName: 'Drone Maniac', completedJob: 21, sponsored: false},
    {imgSrc: 'drone-4.png', droneName: 'Drone Maniac', completedJob: 21, sponsored: false},
    {imgSrc: 'drone-3.png', droneName: 'XtremeDrone', completedJob: 33, sponsored: false},
    {imgSrc: 'drone-2.png', droneName: 'Drone Maniac', completedJob: 21, sponsored: false},
    {imgSrc: 'drone-1.png', droneName: 'Pro Flying', completedJob: 21, sponsored: false},
  ],

  promotedServices: [
    {imgSrc: 'drone-1.png', serviceName: 'Lorem Ipsum Services + XYX Loem',
      serviceCategory: 'Delivery', offPercent: 50, price: 700, newPrice: 350},
    {imgSrc: 'drone-2.png', serviceName: 'Lorem Ipsum Services + XYX Loem',
      serviceCategory: 'Mapping', offPercent: 50, price: 700, newPrice: 350},
    {imgSrc: 'drone-3.png', serviceName: 'Lorem Ipsum Services + XYX Loem',
      serviceCategory: 'Monitoring', offPercent: 50, price: 700, newPrice: 350},
    {imgSrc: 'drone-4.png', serviceName: 'Lorem Ipsum Services + XYX Loem',
      serviceCategory: 'Photography', offPercent: 50, price: 700, newPrice: 350},
  ],

  categories: [
    {categoryImgSrc: 'delivery-category-pic.png', categoryName: 'Delivery', iconName: 'icon-delivery-category'},
    {categoryImgSrc: 'mapping-category-pic.png', categoryName: 'Mapping', iconName: 'icon-mapping-category'},
    {categoryImgSrc: 'monitoring-category-pic.png', categoryName: 'Monitoring', iconName: 'icon-monitoring-category'},
    {categoryImgSrc: 'photography-category-pic.png', categoryName: 'Photography', iconName: 'icon-photography-category'},
    {categoryImgSrc: 'filming-category-pic.png', categoryName: 'Filming', iconName: 'icon-filming-category'},
    {categoryImgSrc: 'construction-category-pic.png', categoryName: 'Construction', iconName: 'icon-construction-category'},
    {categoryImgSrc: 'delivery-category-pic.png', categoryName: 'Delivery', iconName: 'icon-delivery-category'},
    {categoryImgSrc: 'mapping-category-pic.png', categoryName: 'Mapping', iconName: 'icon-mapping-category'},
    {categoryImgSrc: 'monitoring-category-pic.png', categoryName: 'Monitoring', iconName: 'icon-monitoring-category'},
    {categoryImgSrc: 'photography-category-pic.png', categoryName: 'Photography', iconName: 'icon-photography-category'},
  ],

  lastCompletedMissionsData: [
    {routeImg: 'route-1.png', missionTitle: 'Lorem Ipsum Mission Title', id: '123456789ABC',
      droneProvider: 'Drone Maniac', date: ' 10/24/2016  09:30 AM', location: 'Street address lorem...'},
    {routeImg: 'route-1.png', missionTitle: 'Lorem Ipsum Mission Title', id: '123456789ABC',
      droneProvider: 'Drone Maniac', date: ' 10/24/2016  09:30 AM', location: 'Street address lorem...'},
    {routeImg: 'route-1.png', missionTitle: 'Lorem Ipsum Mission Title', id: '123456789ABC',
      droneProvider: 'Drone Maniac', date: ' 10/24/2016  09:30 AM', location: 'Street address lorem...'},
    {routeImg: 'route-1.png', missionTitle: 'Lorem Ipsum Mission Title', id: '123456789ABC',
      droneProvider: 'Drone Maniac', date: ' 10/24/2016  09:30 AM', location: 'Street address lorem...'},
  ],
});
