/* eslint no-console: 0 */

import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './ProviderMap.scss';

const getImage = (name) => `${window.location.origin}/img/${name}`;

  /**
   * The MapTypeCtrl adds map type to roadmap
   * This constructor takes the control DIV as an argument.
   */
function RoadTypeCtrl(controlDiv, map) {
    // Set CSS for the control border.
  const controlUI = document.createElement('div');
  controlUI.id = 'roadMap';

  controlUI.title = 'Click to change the map type';
  controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
  const controlText = document.createElement('div');
  controlText.id = 'roadMapText';

  controlText.innerHTML = 'Map';

  controlUI.appendChild(controlText);

  if (map.getMapTypeId() === 'roadmap') {
    controlUI.style.backgroundColor = '#315b95';
    controlUI.style.border = '1px solid transparent';
    controlText.style.color = '#fff';
  }

    // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', () => {
    if (map.getMapTypeId() !== 'roadmap') {
      SatelliteTypeCtrl(document.createElement('div'), map, 'roadmap');
      document.getElementById('satMap').style.backgroundColor = '#fff';
      document.getElementById('satMap').style.border = '1px solid #d7d7d7';
      document.getElementById('satMapText').style.color = '#383838';
      map.setMapTypeId('roadmap');
      controlUI.style.backgroundColor = '#315b95';
      controlUI.style.border = '1px solid transparent';
      controlText.style.color = '#fff';
    }
  });
  return {controlUI, controlText};
}

  /**
   * The SatelliteTypeCtrl adds map type to Satellite
   * This constructor takes the control DIV as an argument.
   */
function SatelliteTypeCtrl(controlDiv, map) {
    // Set CSS for the control border.
  const controlUI = document.createElement('div');
  controlUI.id = 'satMap';

  controlUI.title = 'Click to change the map type';
  controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
  const controlText = document.createElement('div');
  controlText.id = 'satMapText';

  controlText.innerHTML = 'Satelite';

  controlUI.appendChild(controlText);

  if (map.getMapTypeId() === 'satellite') {
    controlUI.style.backgroundColor = '#315b95';
    controlUI.style.border = '1px solid transparent';
    controlText.style.color = '#fff';
  }

    // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', () => {
    if (map.getMapTypeId() !== 'satellite') {
      RoadTypeCtrl(document.createElement('div'), map, 'satellite');
      document.getElementById('roadMap').style.backgroundColor = '#fff';
      document.getElementById('roadMap').style.border = '1px solid #d7d7d7';
      document.getElementById('roadMapText').style.color = '#383838';
      map.setMapTypeId('satellite');
      controlUI.style.backgroundColor = '#315b95';
      controlUI.style.border = '1px solid transparent';
      controlText.style.color = '#fff';
    }
  });
}

  /**
   * The movedMapCtrl adds map type to Satellite
   * This constructor takes the control DIV as an argument.
   */
function movedMapCtrl(controlDiv, map) {
    // Set CSS for the control border.
  const controlUI = document.createElement('div');
  controlUI.id = 'movMap';

  controlUI.title = 'Toggle to seach while move the map';
  controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
  const controlText = document.createElement('div');
  controlText.id = 'movMapText';

  controlText.innerHTML = '<label for="searchCheckbox"><input id="searchCheckbox" type="checkbox" />Search when I moved map</label>';

  controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
  controlUI.addEventListener('click', () => {
    if (document.getElementById('searchCheckbox').checked) {
        // Listener map move
      map.addListener('dragstart', () => {
        console.log('map move start');
      });
      map.addListener('drag', () => {
        console.log('moving map');
      });
      map.addListener('dragend', () => {
        console.log('map move end');
      });
    } else {
      google.maps.event.clearListeners(map, 'dragstart');
      google.maps.event.clearListeners(map, 'drag');
      google.maps.event.clearListeners(map, 'dragend');
    }
  });
}
/*
 * provider map
 */
class ProviderMap extends React.Component {

  componentDidMount() {
    const _self = this;
    this.map = new google.maps.Map(this.node, {
      zoom: 13,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false,
      mapTypeId: 'roadmap',
    });

    // create info window
    const contentString = '<div id="infowindowContent">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<div id="popupHeading" class="popupHeading">' +
      '<h3>Pro Flying</h3>' +
      '<div id="droneRating"><div class="icon-rate-yellow"></div>4.3</div>' +
      '</div>' +
      '<div id="bodyContent">' +
      '<p>Status: <span class="available">Available</span></p>' +
      '<p>Distance: <span class="distance">500 mts</span></p>' +
      '<p>Rate per mile: <span class="rate">$ 10.00</span></p>' +
      '<div class="view-detail-btn"><a href="javascript:;">View Detail &gt;</a> ' +
      '</div>' +
      '</div>' +
      '</div>';

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // generate random markers arround current location
        for (let i = 4; i >= 0; i--) {
          createMarker(generatePos(pos, 0.02), getImage('icon-provider-drone.png'), _self.map);
        }
        for (let i = 4; i >= 0; i--) {
          createMarker(generatePos(pos, -0.038), getImage('icon-provider-drone.png'), _self.map);
        }

        // current location marker and center to it
        createMarker(pos, getImage('icon-location-red-lg.png'), _self.map);

        _self.map.setCenter(pos);
      }, () => {
        handleLocationError(true);
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false);
    }

    // Create the DIV to hold the control and call the RoadTypeCtrl()
    const roadTypeCtrlDiv = document.createElement('div');
    RoadTypeCtrl(roadTypeCtrlDiv, this.map, 'roadmap');

    roadTypeCtrlDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(roadTypeCtrlDiv);

    // Create the DIV to hold the control and call the SatelliteTypeCtrl()
    const smapTypeCtrlDiv = document.createElement('div');
    SatelliteTypeCtrl(smapTypeCtrlDiv, this.map, 'satellite');

    smapTypeCtrlDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(smapTypeCtrlDiv);

    // Create the DIV to hold the control and call the movedMapCtrl()
    const moveCtrlDiv = document.createElement('div');
    movedMapCtrl(moveCtrlDiv, this.map, 'satellite');

    moveCtrlDiv.index = 1;
    this.map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(moveCtrlDiv);
    // handle location error
    function handleLocationError(browserHasGeolocation) {
      const errorMsg = (browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      console.error(errorMsg);
    }

    // create marker
    function createMarker(pos, icon, map) {
      const marker = new google.maps.Marker({
        icon,
        position: pos,
        map,
      });
      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });

      return marker;
    }

    // generate random lat lng
    function generatePos(pos, margin) {
      const from = pos.lat;
      const to = pos.lat + margin;
      const lat = getRandomInRange(from, to, 5);
      const lfrom = pos.lng;
      const lto = pos.lng + margin;
      const lng = getRandomInRange(lfrom, lto, 5);
      return {lat, lng};
    }
    function getRandomInRange(from, to, fixed) {
      return Number((Math.random() * (to - from) + from).toFixed(fixed));
    }
  }

  shouldComponentUpdate() { // eslint-disable-line lodash/prefer-constant
    // the whole logic is handled by google plugin
    return false;
  }

  render() {
    return (
      <div styleName="provider-map">
        <div styleName="map" ref={(node) => (this.node = node)} />
      </div>
    );
  }
}

ProviderMap.propTypes = {
};


export default CSSModules(ProviderMap, styles);
