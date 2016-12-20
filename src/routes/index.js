import CoreLayout from 'layouts/CoreLayout';
import ServiceRequestRoute from './ServiceRequest';
import DashboardRoute from './Dashboard';
import MyRequestRoute from './MyRequest';
import HomeRoute from './Home';
import BrowseProviderRoute from './BrowseProvider';
import DroneDetailsRoute from './DroneDetails';
import AvailablePackagesRoute from './AvailablePackages';

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
    HomeRoute(store),
    BrowseProviderRoute(store),
    DroneDetailsRoute(store),
    AvailablePackagesRoute(store),
  ],
});

export default createRoutes;
