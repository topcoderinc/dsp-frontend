import React from 'react';
import CSSModules from 'react-css-modules';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import DroneScheduleCalendar from '../../containers/DroneScheduleCalendarContainer';
import LastCompletedMissions from '../../containers/LastCompletedMissionsContainer';
import DroneInfoDetails from '../../containers/DroneInfoDetailsContainer';
import DroneScheduleTable from '../../containers/DroneScheduleTableContainer';
import DroneInfoSpecification from '../../containers/DroneInfoSpecificationContainer';
import styles from './DroneDetailsTabs.scss';

Tabs.setUseDefaultStyles(false);

/*
* DroneDetailsTabs
*/

export const DroneDetailsTabs = () => (
  <Tabs>
    <TabList>
      <Tab>Drone Info</Tab>
      <Tab>Drone Schedule</Tab>
    </TabList>

    <TabPanel>
      <DroneInfoDetails />
      <DroneInfoSpecification />
      <LastCompletedMissions />
    </TabPanel>

    <TabPanel>
      <DroneScheduleCalendar />
      <DroneScheduleTable />
    </TabPanel>

  </Tabs>

);


DroneDetailsTabs.propTypes = {
};


export default CSSModules(DroneDetailsTabs, styles);

