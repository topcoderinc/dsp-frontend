import CoreLayout from 'layouts/CoreLayout';
import MissionProgressRoute from './MissionProgress';
import ServiceRequestRoute from './ServiceRequest';
import DashboardRoute from './Dashboard';
import MyRequestRoute from './MyRequest';
import EditDataRoute from './EditData';
import MyDroneRoute from './MyDrone';
import EditDronesRoute from './EditDrones';
import DroneDetailsRoute from './DroneDetails';
import ServiceDetailsRoute from './ServiceDetails';
import MyServicesRoute from './MyServices';
import AddServicesRoute from './AddServices';

export const createRoutes = (store) => ({
  path: '/',
  name: 'CoreLayout', /* Breadcrumb name */
  staticName: true,
  component: CoreLayout,
  indexRoute: {
    onEnter: (nextState, replace, cb) => {
      replace('/dashboard');
      cb();
    },
  },
  childRoutes: [
    ServiceRequestRoute(store),
	DashboardRoute(store),
    MyRequestRoute(store),
    MissionProgressRoute(store),
    EditDataRoute(store),
    MyDroneRoute(store),
    DroneDetailsRoute(store),
    EditDronesRoute(store),
    MyServicesRoute(store),
    ServiceDetailsRoute(store),
    AddServicesRoute(store),

  ],
});


export default createRoutes;
