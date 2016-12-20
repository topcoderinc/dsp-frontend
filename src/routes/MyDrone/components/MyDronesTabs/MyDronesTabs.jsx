import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from './MyDronesTabs.scss';
import MyDronesTable from '../MyDronesTable';

Tabs.setUseDefaultStyles(false);

/*
* MyDronesTabs
*/

export const MyDronesTabs = ({availableDrones, onMissionDrones, itemPerPage, items, displayingHandle, displaying}) => (
  <Tabs selectedIndex={0}>

    <TabList>
      <Tab>Available(<span>{availableDrones.length}</span>)</Tab>
      <Tab>On Mission(<span>{onMissionDrones.length}</span>)</Tab>
    </TabList>

    <TabPanel>
      <MyDronesTable
        tableData={availableDrones}
        itemPerPage={itemPerPage}
        items={items}
        displayingHandle={displayingHandle}
        displaying={displaying}
      />
    </TabPanel>

    <TabPanel>
      <MyDronesTable
        tableData={onMissionDrones}
        itemPerPage={itemPerPage}
        items={items}
        displayingHandle={displayingHandle}
        displaying={displaying}
      />
    </TabPanel>

  </Tabs>
);


MyDronesTabs.propTypes = {
  availableDrones: PropTypes.array.isRequired,
  onMissionDrones: PropTypes.array.isRequired,
  items: PropTypes.object.isRequired,
  itemPerPage: PropTypes.func.isRequired,
  displayingHandle: PropTypes.func.isRequired,
  displaying: PropTypes.object.isRequired,
};


export default CSSModules(MyDronesTabs, styles);

