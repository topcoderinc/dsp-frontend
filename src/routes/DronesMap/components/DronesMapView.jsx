import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import MarkerClusterer from 'node-js-marker-clusterer';
import {GOOGLE_MAPS_BOUNDS_TIMEOUT} from 'Const';
import _ from 'lodash';
import styles from './DronesMapView.scss';

const getIcon = (status) => {
  switch (status) {
    case 'in-motion':
      return 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    case 'idle-ready':
      return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    case 'idle-busy':
      return 'http://maps.google.com/mapfiles/ms/icons/orange-dot.png';
    default:
      throw new Error(`invalid drone status ${status}`);
  }
};

const getLatLng = ({currentLocation}) => ({lng: currentLocation[0], lat: currentLocation[1]});

class DronesMapView extends React.Component {

  constructor(props) {
    super(props);
    // google maps objects for no fly zones
    this.nfzElements = [];
  }

  componentDidMount() {
    const {drones, mapSettings, loadNfz} = this.props;
    this.map = new google.maps.Map(this.node, mapSettings);
    this.nfzElements = [];

    const id2Marker = {};

    const markers = drones.map((drone) => {
      const marker = new google.maps.Marker({
        clickable: false,
        crossOnDrag: false,
        cursor: 'pointer',
        position: getLatLng(drone),
        icon: getIcon(drone.status),
        label: drone.name,
      });
      id2Marker[drone.id] = marker;
      return marker;
    });
    this.id2Marker = id2Marker;
    this.markerCluster = new MarkerClusterer(this.map, markers, {imagePath: '/img/m'});

    google.maps.event.addListener(this.map, 'bounds_changed', _.debounce(() => {
      const bounds = this.map.getBounds().toJSON();
      loadNfz(bounds);
    }, GOOGLE_MAPS_BOUNDS_TIMEOUT));
  }

  componentWillReceiveProps(nextProps) {
    const {drones} = nextProps;
    drones.forEach((drone) => {
      const marker = this.id2Marker[drone.id];
      if (marker) {
        marker.setPosition(getLatLng(drone));
        marker.setLabel(drone.name);
      }
    });
    if (nextProps.noFlyZones !== this.props.noFlyZones) {
      this.nfzElements.forEach((zone) => zone.setMap(null));
      this.nfzElements = nextProps.noFlyZones.map((zone) => {
        let element;
        if (zone.circle) {
          element = new google.maps.Circle({
            ...zone.style,
            radius: zone.circle.radius,
            center: {
              lng: zone.circle.center[0],
              lat: zone.circle.center[1],
            },
          });
        } else {
          element = new google.maps.Polygon({
            ...zone.style,
            path: zone.location.coordinates[0].map((pair) => ({lng: pair[0], lat: pair[1]})),
          });
        }
        element.setMap(this.map);
        return element;
      });
    }
    this.markerCluster.repaint();
  }

  shouldComponentUpdate() { // eslint-disable-line lodash/prefer-constant
    // the whole logic is handled by google plugin
    return false;
  }

  componentWillUnmount() {
    this.props.disconnect();
  }

  render() {
    return <div styleName="map-view" ref={(node) => (this.node = node)} />;
  }
}

DronesMapView.propTypes = {
  drones: PropTypes.array.isRequired,
  disconnect: PropTypes.func.isRequired,
  mapSettings: PropTypes.object.isRequired,
  loadNfz: PropTypes.func.isRequired,
  noFlyZones: PropTypes.array.isRequired,
};

export default CSSModules(DronesMapView, styles);
