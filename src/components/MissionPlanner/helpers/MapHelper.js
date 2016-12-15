/* eslint-disable */
/**
 * Copyright (c) 2016 Topcoder Inc, All rights reserved.
 */



/**
 * Helper functions
 *
 * @author       TCSCODER
 * @version      1.0.0
 */
const getImage = (name) => `${window.location.origin}/img/${name}`;


/**
 * Handle the mission item update fired from info window component
 * @param  {Object}     _self             the 'this' object
 * @param  {Number}     id                the id of mission item in mission items array
 * @param  {Object}     missionItem       the updated mission item
 */
function handleMissionItemUpdate(_self, id, missionItem) {
  // update marker position
  const marker = _self.state.markers[id];
  const markerPosition = marker.getPosition();

  if ( markerPosition.lat() !== missionItem.coordinate[0] || markerPosition.lng() !== missionItem.coordinate[1] ) {
    // update marker position
    marker.setPosition(new google.maps.LatLng(missionItem.coordinate[0], missionItem.coordinate[1]));
    // update line
    //i && this.poly.getPath().setAt(i - 1, new google.maps.LatLng(missionItem.coordinate[0], missionItem.coordinate[1]));
  }

  // update missionItem
  if (id === 0) {
    _self.setState({ plannedHomePosition: missionItem });
  } else {
    const missionItems = _self.state.missionItems;
    missionItems.splice(id - 1, 1, missionItem);
    _self.setState({ missionItems: missionItems });
  }
}

/**
 * Attach the click event on marker and handle the click event on the marker
 *
 * @param  {Object}     _self             the 'this' object
 * @param   {object}       event          the propogated event
 */
function handleMarkerClick(_self, marker) {
  marker.addListener('drag', (event) => {
    const id = marker.get('id') - 1;
    if (id > 0) {
      const curMissionItems = _self.state.missionItems;
      curMissionItems[id].coordinate[0] = marker.getPosition().lat();
      curMissionItems[id].coordinate[1] = marker.getPosition().lng();
    } else {
      const plannedHomePosition = _self.state.plannedHomePosition;
      plannedHomePosition.coordinate[0] = marker.getPosition().lat();
      plannedHomePosition.coordinate[1] = marker.getPosition().lng();
    }
    initPolyline(_self);
  });
  marker.addListener('dragstart', (event) => {
    _self.canAddNewPoint = false;
  });
  marker.addListener('dragend', (event) => {
    _self.canAddNewPoint = true;
    _self.setState({});
  });
}

/**
 * Add new marker (waypoint)
 *
 * @param   {Object}     _self             the 'this' object
 * @param   {object}     latLng            the coordinates object
 * @param   {Number}     alt               the altitude
 */
function addPoint(_self, latLng, alt) {
  const google = window.google;
  initPolyline(_self);
  const path = _self.poly.getPath();
  const markers = _self.state.markers;
  let idSequence = _self.state.idSequence;
  const markerOpts = getMarkerOpts(_self, idSequence, latLng.lat(), latLng.lng(), _self.props.isEditable);
  const marker = new google.maps.Marker(markerOpts);
  marker.set('id', idSequence);
  const missionItems = _self.state.missionItems;
  const missionItem = getMissionItem(idSequence, latLng.lat(), latLng.lng(), alt);
  if (idSequence !== 0) {
    // if id sequence is 0 than it is home point, so home point is not added to mission items.
    missionItems.push(missionItem);
  } else {
    _self.setState({ plannedHomePosition: missionItem });
  }
  idSequence += 1;
  handleMarkerClick(_self, marker);
  markers.push(marker);
  _self.setState({ markers: markers, idSequence: idSequence, missionItems: missionItems });
  if (idSequence !== 1) {
    path.push(latLng);
  }
}

/**
 * Delete single marker (waypoint)
 *
 * @param   {Object}     _self             the 'this' object
 * @param   {Number}     id                the index of the marker (waypoint) to delete
 */
function deleteWaypoint(_self, id) {
  _self.setState((prevState) => {
    let missionItems = _.clone(prevState.missionItems);

    missionItems.splice(id - 1, 1);
    missionItems = missionItems.map((missionItem, index) => {
      // tekeoff point
      if ( index === 0 ) {
        missionItem.command = 22;
      }
      missionItem.id = index;
      return missionItem;
    });

    const markers = _.clone(prevState.markers);
    markers[id].setMap(null);
    markers.splice(id, 1);
    for (let i = 0; i < markers.length; i++) {
      markers[i].set('id', i);

      if ( i === 1 ) {
        const takeOffIcon = _self.props.isSmall
          ? {
              anchor: new google.maps.Point(11, 11),
              url: getImage('icon-location-circle-green.png')
            }
          : getImage('icon-location-green-lg.png');

         markers[i].setIcon(takeOffIcon);
      }
    }

    return { missionItems: missionItems, markers: markers, idSequence: prevState.idSequence - 1 }
  });

}

/**
 * Draw Polyline on the map
 *
 * @param   {Object}     _self             the 'this' object
 */
function initPolyline(_self) {
  const google = window.google;
  const locations = [];
  for (let i = 1; i < _self.state.markers.length; i++) {
    locations.push(_self.state.markers[i].getPosition());
  }
  if ( _self.state.markers.length && !_self.props.isEditable ) {
    locations.push(_self.state.markers[0].getPosition());
  }


  if (_self.poly) _self.poly.setMap(null);
  _self.poly = new google.maps.Polyline({
    clickable: _self.props.isEditable,
    path: locations,
    strokeColor: '#1db0e6',
    strokeOpacity: 1.0,
    strokeWeight: 4
  });
  _self.poly.setMap(_self.map);
}

function drawDrone(_self, coords) {
  const circleMarkerOpts = {
    position: new google.maps.LatLng(coords.lat, coords.lng),
    clickable: false,
    map: _self.map,
    icon: {
      anchor: new google.maps.Point(15, 15),
      url: getImage('icon-location-circle-blue.png')
    },
  };

  if (!_self.state.droneMarker) {
    _self.setState({ droneMarker: new google.maps.Marker(circleMarkerOpts) });
  }
}

function drawProvider(_self, coords) {
  const droneMarkerOpts = {
    position: new google.maps.LatLng(coords.lat, coords.lng),
    clickable: false,
    map: _self.map,
    icon: {
      anchor: new google.maps.Point(36, 89),
      url: getImage('icon-drone-location-lg.png')
    },
  };

  if (!_self.state.providerMarker) {
    _self.setState({ providerMarker: new google.maps.Marker(droneMarkerOpts) });
  }
}

/**
 * Create marker options object
 *
 * @param   {Object}     _self             the 'this' object
 * @param   {Number}     idSequence        the marker id (index)
 * @param   {Number}     lat               the latitude
 * @param   {Number}     lng               the longitude
 */
function getMarkerOpts(_self, idSequence, lat, lng, isEditable) {
  const google = window.google;
  const markerOpts = {
    position: new google.maps.LatLng(lat, lng),
    clickable: isEditable,
    map: _self.map,
    icon: null,
    draggable: isEditable
  };
  if (idSequence === 0) {
    // add the home
    if (_self.props.isSmall) {
      markerOpts.icon = {
        anchor: new google.maps.Point(11, 11),
        url: getImage('icon-location-circle-red.png'),
      }
    } else {
      markerOpts.icon = getImage('icon-location-red-lg.png');
    }
  } else if (idSequence === 1) {
    // add the takeoff marker
    if (_self.props.isSmall) {
      markerOpts.icon = {
        anchor: new google.maps.Point(11, 11),
        url: getImage('icon-location-circle-green.png')
      }
    } else {
      markerOpts.icon = getImage('icon-location-green-lg.png');
    }
  } else {
    // add general waypoint marker
    if (!_self.props.isEditable) {
      markerOpts.visible = false;
    } else {
      markerOpts.icon = {
        anchor: new google.maps.Point(15, 15),
        url: getImage('icon-location-circle-blue.png')
      }
    }
  }
  return markerOpts;
}

/**
 * Get mission item object
 *
 * @param   {Number}     idSequence        the marker id (index)
 * @param   {Number}     lat               the latitude
 * @param   {Number}     lng               the longitude
 * @param   {Number}     alt               the altitude
 */
function getMissionItem(idSequence, lat, lng, alt) {
  if (idSequence !== 0) {
    return {
      autoContinue: true,
      command: idSequence === 1 ? 22 : 16,
      coordinate: [lat, lng, alt],
      frame: 3,
      id: idSequence,
      param1: 0.000000,
      param2: 0.000000,
      param3: 0.000000,
      param4: 0.000000,
      type: 'missionItem'
    }
  }
  return {
    autoContinue: true,
    command: 16,
    coordinate: [lat, lng, alt],
    frame: 0,
    id: idSequence,
    param1: 0.000000,
    param2: 0.000000,
    param3: 0.000000,
    param4: 0.000000,
    type: 'missionItem'
  }
}

export const MapHelper = {
  handleMissionItemUpdate,
  handleMarkerClick,
  addPoint,
  deleteWaypoint,
  initPolyline,
  getMarkerOpts,
  drawDrone,
  drawProvider,
};
