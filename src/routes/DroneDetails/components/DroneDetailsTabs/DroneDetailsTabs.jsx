import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import DroneInfoDetails from '../DroneInfoDetails';
import DroneScheduleCalendar from '../DroneScheduleCalendar';
import DroneScheduleTableContainer from '../../containers/DroneScheduleTableContainer';
import DroneInfoSpecification from '../DroneInfoSpecification';
import LastCompletedMissions from '../LastCompletedMissions';
import styles from './DroneDetailsTabs.scss';

Tabs.setUseDefaultStyles(false);

/*
* DroneDetailsTabs
*/

export const DroneDetailsTabs = ({LastCompletedMissionsData, droneSpecifications, droneBenefits, droneInfoDetails, selectedDateHandle}) => (
  <Tabs>
    <TabList>
      <Tab>Drone Info</Tab>
      <Tab>Drone Schedule</Tab>
    </TabList>

    <TabPanel>
      <DroneInfoDetails droneInfoDetails={droneInfoDetails} />
      <DroneInfoSpecification droneSpecifications={droneSpecifications} droneBenefits={droneBenefits} />
      <LastCompletedMissions LastCompletedMissionsData={LastCompletedMissionsData} />
    </TabPanel>

    <TabPanel>
      <DroneScheduleCalendar selectedDateHandle={selectedDateHandle} />
      <DroneScheduleTableContainer />
    </TabPanel>

  </Tabs>

);


DroneDetailsTabs.propTypes = {
  LastCompletedMissionsData: PropTypes.array.isRequired,
  droneSpecifications: PropTypes.object.isRequired,
  droneBenefits: PropTypes.array.isRequired,
  droneInfoDetails: PropTypes.object.isRequired,
  selectedDateHandle: PropTypes.func.isRequired,
};


export default CSSModules(DroneDetailsTabs, styles);

