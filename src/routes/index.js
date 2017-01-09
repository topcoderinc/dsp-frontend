import CoreLayout from 'layouts/CoreLayout';
import AdminLayout from 'layouts/AdminLayout';
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
import AdminDashboard from './Admin/AdminDashboard';
import NoFlyZones from './Admin/NoFlyZones';
import ProviderDetailsRoute from './ProviderDetails';
import ResetPasswordRoute from './ResetPassword';
import PilotMissionsRoute from './PilotMissions';
import PilotChecklistRoute from './PilotChecklist';
import {defaultAuth0Service} from '../services/AuthService';

import {onSocialLoginSuccessAction} from 'store/modules/global';

export const createRoutes = (store) => ({
  path: '/',
  name: 'CoreLayout',
  indexRoute: {
    onEnter: (nextState, replace, cb) => {
      // parse the hash if present
      if (nextState.location.hash) {
        defaultAuth0Service.parseHash(nextState.location.hash).then(() => {
          store.dispatch(onSocialLoginSuccessAction());
          cb();
        });
      } else {
        replace('/dashboard');
        cb();
      }
    },
  },
  childRoutes: [
    // non-admin routes
    {
      name: 'CoreLayout', /* Breadcrumb name */
      staticName: true,
      component: CoreLayout,
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
        PilotMissionsRoute(store),
        PilotChecklistRoute(store),
      ],
    },
    ResetPasswordRoute(store),
    // admin routes
    {
      path: 'admin',
      name: 'Admin',
      indexRoute: {
        onEnter: (nextState, replace, cb) => {
          replace('/admin/dashboard');
          cb();
        },
      },
      staticName: true,
      component: AdminLayout,
      childRoutes: [
        AdminDashboard(store),
        NoFlyZones(store),
      ],
    },
  ],
});


export default createRoutes;
