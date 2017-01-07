import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './MyDronesTabs.scss';

/*
* MyDronesTabs
*/
export const MyDronesTabs = ({currentTab, updateDroneTable, availableDrones, onMissionDrones}) => (
  <div styleName="my-drones-tabs">
    <div
      styleName={currentTab === 'available' ? 'tab_active' : 'tab'}
      onClick={() => {
        currentTab !== 'available' && updateDroneTable({currentTab: 'available'});
      }}
    >Available ({availableDrones.total})
    </div>
    <div
      styleName={currentTab === 'onMission' ? 'tab_active' : 'tab'}
      onClick={() => {
        currentTab !== 'onMission' && updateDroneTable({currentTab: 'onMission'});
      }}
    >On Mission ({onMissionDrones.total})
    </div>
  </div>
);


MyDronesTabs.propTypes = {
  currentTab: PropTypes.string.isRequired,
  updateDroneTable: PropTypes.func.isRequired,
  availableDrones: PropTypes.object.isRequired,
  onMissionDrones: PropTypes.object.isRequired,
};


export default CSSModules(MyDronesTabs, styles);

