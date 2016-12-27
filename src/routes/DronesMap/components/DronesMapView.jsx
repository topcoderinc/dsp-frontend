import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import MarkerClusterer from 'node-js-marker-clusterer';
import MapHistory from 'components/MapHistory';
import Info from './Info';
import styles from './DronesMapView.scss';
const _ = require('lodash');

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

const HIDE_INFO_DELAY = 500;

const getLatLng = ({currentLocation}) => ({lng: currentLocation[0], lat: currentLocation[1]});

const getMarkerPoint = (marker, overlay) => (overlay.getProjection().fromLatLngToContainerPixel(marker.getPosition()));

class DronesMapView extends React.Component {

  constructor(props) {
    super(props);

    this.showHistory = this.showHistory.bind(this);
    this.hideHistory = this.hideHistory.bind(this);
    this.cancelHideInfo = this.cancelHideInfo.bind(this);
  }

  componentDidMount() {
    const {drones, mapSettings, showInfo, hideInfo} = this.props;
    this.map = new google.maps.Map(this.node, mapSettings);
    const overlay = new google.maps.OverlayView();
    overlay.draw = _.noop;
    overlay.setMap(this.map);
    const hideInfoWindow = () => {
      this.props.infoDrone && hideInfo();
    };
    this.map.addListener('zoom_changed', hideInfoWindow);
    this.map.addListener('dragstart', hideInfoWindow);
    const id2Marker = {};

    // create markers
    const markers = drones.map((drone) => {
      const marker = new google.maps.Marker({
        crossOnDrag: false,
        cursor: 'pointer',
        position: getLatLng(drone),
        icon: getIcon(drone.status),
        label: drone.name,
      });

      // show info window when mouse hover on marker
      marker.addListener('mouseover', () => {
        const point = getMarkerPoint(marker, overlay);
        if (point.x < 200) {
          this.map.panBy(-200, 0);
        }
        if (point.y < 120) {
          this.map.panBy(0, -120);
        }
        showInfo(drone, getMarkerPoint(marker, overlay));
      });
      marker.addListener('mouseout', () => {
        this.timer = setTimeout(hideInfo, HIDE_INFO_DELAY);
      });
      id2Marker[drone.id] = marker;
      return marker;
    });
    this.id2Marker = id2Marker;
    this.markerCluster = new MarkerClusterer(this.map, markers, {imagePath: '/img/m'});
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
    this.markerCluster.repaint();
  }

  componentWillUnmount() {
    this.props.disconnect();
  }

  // show history modal
  showHistory() {
    this.props.hideInfo();
    this.props.getLocations(this.props.infoDrone.id);
  }

  // hide history modal
  hideHistory() {
    this.props.hideHistory();
  }

  // cancel the hiding info window operation
  cancelHideInfo() {
    clearTimeout(this.timer);
  }


  render() {
    return (<div styleName="map-wrap">
      <div styleName="map-view" ref={(node) => (this.node = node)} />
      {
                this.props.infoDrone ?
                (<div styleName="map-popover" onMouseEnter={this.cancelHideInfo} onMouseLeave={this.props.hideInfo} style={{top: this.props.infoPos.y - 30, left: this.props.infoPos.x}}>
                  <Info drone={this.props.infoDrone} showHistory={this.showHistory} />
                </div>) : null
              }
      {
                this.props.historyDrone ?
                (<div styleName="map-history">
                  <div styleName="history-inner">
                    <MapHistory locations={this.props.locations} />
                  </div>
                  <div styleName="close" onClick={this.hideHistory}>X</div>
                </div>) : null
              }
    </div>);
  }
}

DronesMapView.propTypes = {
  drones: PropTypes.array.isRequired,
  disconnect: PropTypes.func.isRequired,
  mapSettings: PropTypes.object.isRequired,
  showInfo: PropTypes.func.isRequired,
  hideInfo: PropTypes.func.isRequired,
  getLocations: PropTypes.func.isRequired,
  hideHistory: PropTypes.func.isRequired,
  infoDrone: PropTypes.object,
  infoPos: PropTypes.object,
  historyDrone: PropTypes.string,
  locations: PropTypes.array,
};

export default CSSModules(DronesMapView, styles);
