import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import MapLegends from '../MapLegends';
import styles from './ProviderMap.scss';

const statusToImage = {
  'idle-busy': 'icon-error-drone.png',
  'in-motion': 'icon-booked-drone.png',
  'idle-ready': 'icon-standby-drone.png',
};

const getMarkerIcon = (status) => `${window.location.origin}/img/${statusToImage[status]}`;

const mapConfig = {
  zoom: 13,
  center: {
    lat: -6.202180076671433,
    lng: 106.83877944946289,
  },
  mapTypeControl: false,
  zoomControl: false,
  streetViewControl: false,
  clickableIcons: false,
};

/*
* ProviderMap
*/

class ProviderMap extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.node, mapConfig);
    this.droneMarkers = [];

    // add all markers to the map
    for (const droneCurrentLocation of this.props.dronesCurrentLocations) {
      if (droneCurrentLocation.currentLocation.length >= 2) {
        const droneMarker = new google.maps.Marker({
          icon: getMarkerIcon(droneCurrentLocation.status),
          position: {
            lng: droneCurrentLocation.currentLocation[0],
            lat: droneCurrentLocation.currentLocation[1],
          },
          map: this.map,
        });
        this.droneMarkers.push(droneMarker);
      }
    }

    // zoom map to fit all markers
    const markersBounds = new google.maps.LatLngBounds();
    for (const droneMarker of this.droneMarkers) {
      markersBounds.extend(droneMarker.getPosition());
    }
    this.map.setCenter(markersBounds.getCenter());
    this.map.fitBounds(markersBounds);
  }

  shouldComponentUpdate() { // eslint-disable-line lodash/prefer-constant
    // the whole logic is handled by google plugin
    return false;
  }

  render() {
    return (
      <div styleName="provider-map">
        <div styleName="map" ref={(node) => (this.node = node)} />
        <MapLegends />
      </div>
    );
  }
}

ProviderMap.propTypes = {
  dronesCurrentLocations: PropTypes.array.isRequired,
};


export default CSSModules(ProviderMap, styles);
