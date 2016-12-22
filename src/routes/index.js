import CoreLayout from 'layouts/CoreLayout';
import MissionProgressRoute from './MissionProgress';
import ServiceRequestRoute from './ServiceRequest';
import DashboardRoute from './Dashboard';
import MissionList from './MissionList';
import MissionPlanner from './MissionPlanner';
import MyRequestRoute from './MyRequest';
import MyRequestStatusRoute from './MyRequestStatus';
import StatusDetailRoute from './StatusDetail';
import DronesMapRoute from './DronesMap';
import EditDataRoute from './EditData';
import MyDroneRoute from './MyDrone';
import EditDronesRoute from './EditDrones';
import ServiceDetailsRoute from './ServiceDetails';
import MyServicesRoute from './MyServices';
import AddServicesRoute from './AddServices';
import HomeRoute from './Home';
import BrowseProviderRoute from './BrowseProvider';
import DroneDetailsRoute from './DroneDetails';
import AvailablePackagesRoute from './AvailablePackages';
import ProviderDetailsRoute from './ProviderDetails';

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
    MissionList(store),
    MissionPlanner(store),
    MyRequestRoute(store),
    MyRequestStatusRoute(store),
    StatusDetailRoute(store),
    DronesMapRoute(store),
    MissionProgressRoute(store),
    EditDataRoute(store),
    MyDroneRoute(store),
    DroneDetailsRoute(store),
    EditDronesRoute(store),
    MyServicesRoute(store),
    ServiceDetailsRoute(store),
    AddServicesRoute(store),
    HomeRoute(store),
    BrowseProviderRoute(store),
    DroneDetailsRoute(store),
    AvailablePackagesRoute(store),
    ProviderDetailsRoute(store),

  ],
});


export default createRoutes;
