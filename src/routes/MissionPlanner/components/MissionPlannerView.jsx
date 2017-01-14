import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import MissionMap from './MissionMap';
import MissionSidebar from './MissionSidebar';
import RTFZSidebar from './RTFZSidebar';
import MissionPlannerHeader from '../containers/MissionPlannerHeaderContainer';
import styles from './MissionPlannerView.scss';

const getImage = (name) => `${window.location.origin}/img/${name}`;
const homeIcon = getImage('icon-location-green-lg.png');
const takeOffIcon = getImage('icon-location-red-lg.png');
const waypointIcon = getImage('icon-waypoint-blue.png');

export const getMissionItemsExt = (mission) => {
  let missionItemsExt = [];
  mission.plannedHomePosition && missionItemsExt.push(mission.plannedHomePosition);


  if (mission.missionItems) {
    missionItemsExt = [...missionItemsExt, ...mission.missionItems];
  }

  return missionItemsExt;
};

export const getMarkerProps = (item, updateMissionItem) => {
  const markerProps = {
    key: item.uid,
    position: {lat: item.coordinate[0], lng: item.coordinate[1]},
    draggable: true,
    onDragEnd: (event) => {
      const newMissionItem = {
        ...item,
        coordinate: [
          event.latLng.lat(),
          event.latLng.lng(),
          item.coordinate[2],
        ],
      };

      updateMissionItem(item.id, newMissionItem);
    },
  };

  // home marker
  if (item.id === 0) {
    markerProps.icon = homeIcon;
  }

  // take-off marker
  if (item.id === 1) {
    markerProps.icon = takeOffIcon;
  }

  // waypoint marker
  if (item.id > 1) {
    markerProps.icon = {
      anchor: {x: 12, y: 12},
      url: waypointIcon,
    };
    markerProps.label = {
      color: '#1db0e6',
      text: item.id.toString(),
      fontWeight: '800',
    };
  }

  return markerProps;
};

export const MissionPlannerView = ({mission, toggleRtfzHandler, updateMissionItem, addMissionItem, deleteMissionItem, loadNfz, noFlyZones}) => {
  const missionItemsExt = getMissionItemsExt(mission);
  const markersExt = missionItemsExt.map((item) => getMarkerProps(item, updateMissionItem));

  return (
    <div styleName="mission-planner-view">
      <div styleName="header">
        <MissionPlannerHeader />
      </div>
      <div styleName="map">
        <MissionMap
          loadNfz={loadNfz}
          noFlyZones={noFlyZones}
          markers={markersExt}
          rtfzs={mission.zones}
          onMapClick={(event) => addMissionItem({lat: event.latLng.lat(), lng: event.latLng.lng()})}
        />
        <MissionSidebar missionItems={missionItemsExt} onUpdate={updateMissionItem} onDelete={deleteMissionItem} />
        <RTFZSidebar rtfzs={mission.zones} toggleRtfzHandler={toggleRtfzHandler} />
      </div>
    </div>
  );
};

MissionPlannerView.propTypes = {
  mission: PropTypes.object.isRequired,
  updateMissionItem: PropTypes.func.isRequired,
  addMissionItem: PropTypes.func.isRequired,
  deleteMissionItem: PropTypes.func.isRequired,
  loadNfz: PropTypes.func.isRequired,
  noFlyZones: PropTypes.array.isRequired,
  toggleRtfzHandler: PropTypes.func.isRequired,
};

export default CSSModules(MissionPlannerView, styles);
