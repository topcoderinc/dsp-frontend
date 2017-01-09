import {injectReducer} from '../../store/reducers';
import React from 'react';
import BreadcrumbItem from './containers/BreadcrumbItemContainer';

export default (store) => ({
  name: 'Flight Checklist',
  path: 'pilot-checklist/:id',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const PilotChecklist = require('./containers/PilotChecklistContainer').default;
      const reducer = require('./modules/PilotChecklist').default;

      injectReducer(store, {key: 'pilotChecklist', reducer});
      cb(null, PilotChecklist);
    }, 'PilotChecklist');
  },
  prettifyParam: () => React.createElement(BreadcrumbItem), // eslint-disable-line react/display-name
});
