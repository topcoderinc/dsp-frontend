import { injectReducer } from '../../store/reducers';

export default (store) => ({
  path: 'my-drone',
  name: 'My Services', /* Breadcrumb name */
  staticName: true,
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const MyDrone = require('./containers/MyDroneContainer').default;
      const reducer = require('./modules/MyDrone').default;

      injectReducer(store, { key: 'myDrone', reducer });
      cb(null, MyDrone);
    }, 'MyDrone');
  },
});
