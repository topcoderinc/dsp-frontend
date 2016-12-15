/* eslint-disable */

import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './MissionPlanner.scss';
import InfoWindow from '../InfoWindow';
import { MapHelper } from './helpers/MapHelper';

const googleMapDefaultConfig = {
  center: {
    lat: -6.204569263907068,
    lng: 106.80788040161133,
  },
  zoom: 13,
  disableDefaultUI: true,
}

class MissionPlanner extends React.Component {

  constructor(props) {
    super(props);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleMissionItemUpdate = this.handleMissionItemUpdate.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.deleteWaypoint = this.deleteWaypoint.bind(this);
    this.canAddNewPoint = true;
    this.state = {
      // the path markers
      markers: [],
      missionItems: [],
      idSequence: 0,
      droneMarker: null,
      providerMarker: null,
    }
  }

  clearAll() {
    MapHelper.clearAll(this);
  }

  onValidMissionName(value) {
    this.setState({ missionName: value });
  }

  /**
   * Handle the mission item update fired from info window component
   * @param  {Number}     id                the id of mission item in mission items array
   * @param  {Object}     missionItem       the updated mission item
   */
  handleMissionItemUpdate(id, missionItem) {
    MapHelper.handleMissionItemUpdate(this, id, missionItem);
  }

  /**
  * Handle the click event on the map
  * @param   {object}       event          the propogated event
  */
  handleMapClick(event) {
    MapHelper.addPoint(this, event.latLng, 0);
  }

  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    MapHelper.initPolyline(this)
  }

  componentWillUnmount() {
    const _self = this;
    if (_self.poly) {
      _self.poly.setMap(null);
      _self.poly = null;
    }
    // remove all markers
    _self.state.markers.forEach((single) => {
      single.setMap(null);
    });
    _self.map = null;
  }

  loadMap() {
    const _self = this;
    const google = window.google;
    _self.map = new google.maps.Map(_self.mapElement, {
      ...googleMapDefaultConfig,
      center: this.props.center || googleMapDefaultConfig.center
    });
    // add click listener on map
    this.props.isEditable && _self.map.addListener('click', this.handleMapClick);

    this.props.mission && this.loadInitialPoints(this.props.mission);

    this.props.droneCoords && MapHelper.drawDrone(this, this.props.droneCoords);

    this.props.providerCoords && MapHelper.drawProvider(this, this.props.providerCoords);
  }

  deleteWaypoint(id) {
    MapHelper.deleteWaypoint(this, id);
  }

  loadInitialPoints(mission) {
    const _self = this;
    const google = window.google;
    // MapHelper.initPolyline(_self);
    // const path = _self.poly.getPath();
    const markers = _self.state.markers;
    let bounds = new google.maps.LatLngBounds();
    // add planned home position marker
    const markerOpts = MapHelper.getMarkerOpts(_self, 0, mission.plannedHomePosition.coordinate[0],
      mission.plannedHomePosition.coordinate[1], this.props.isEditable);
    const marker = new google.maps.Marker(markerOpts);
    marker.set('id', 0);
    this.props.isEditable && MapHelper.handleMarkerClick(_self, marker);
    markers.push(marker);
    bounds.extend(new google.maps.LatLng(mission.plannedHomePosition.coordinate[0], mission.plannedHomePosition.coordinate[1]));


    mission.missionItems.forEach((single, index) => {
      const markerOpts = MapHelper.getMarkerOpts(_self, index + 1, single.coordinate[0], single.coordinate[1], this.props.isEditable);
      const marker = new google.maps.Marker(markerOpts);
      marker.set('id', index + 1);
      this.props.isEditable && MapHelper.handleMarkerClick(_self, marker);
      markers.push(marker);
      // path.push(new google.maps.LatLng(single.coordinate[0], single.coordinate[1]));
      bounds.extend(new google.maps.LatLng(single.coordinate[0], single.coordinate[1]))
      _self.map.fitBounds(bounds);
    });

    //path.push(new google.maps.LatLng(mission.plannedHomePosition.coordinate[0], mission.plannedHomePosition.coordinate[1]));
    _self.setState({ markers: markers, idSequence: mission.missionItems.length + 1,
      missionItems: mission.missionItems,
      plannedHomePosition: mission.plannedHomePosition, missionName: mission.missionName });
  }

  render() {
    const missionItems = [...this.state.missionItems];

    this.state.plannedHomePosition && missionItems.unshift(this.state.plannedHomePosition);

    return (
      <div styleName="mission-planner">
        <div styleName="map" id="map-container" ref={ (element) => this.mapElement = element } />
        {this.props.isEditable &&
          <div styleName={missionItems.length > 0 ? 'sidebar' : 'hidden'}>
            {
              missionItems.map((item, index) => {
                return (
                  <InfoWindow
                    key={index}
                    id={index}
                    lat={item.coordinate[0]}
                    lng={item.coordinate[1]}
                    alt={item.coordinate[2]}
                    param1={item.param1}
                    param2={item.param2}
                    param3={item.param3}
                    param4={item.param4}
                    command={item.command}
                    frame={item.frame}
                    onUpdate={this.handleMissionItemUpdate}
                    deleteWaypoint={this.deleteWaypoint}
                  />
                );
              })
            }
          </div>
        }
      </div>
    );
  }
}

MissionPlanner.propTypes = {
  isEditable: PropTypes.bool,
  droneCoords: PropTypes.object,
  providerCoords: PropTypes.object,
  mission: PropTypes.object,
  isSmall: PropTypes.bool,
  center: PropTypes.object,
}

MissionPlanner.defaultProps = {
 isEditable: false,
 isSmall: false,
}

export default CSSModules(MissionPlanner, styles);
