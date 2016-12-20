import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import MapLegends from '../MapLegends';
import styles from './ProviderMap.scss';

const getImage = (name) => `${window.location.origin}/img/${name}`;


/*
* ProviderMap
*/

class ProviderMap extends React.Component {

  componentDidMount() {
    const { doneCoords, wayPoints, statusName } = this.props;

    this.map = new google.maps.Map(this.node, {
      zoom: 16,
      center: doneCoords,
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false,
    });

    const flightPath = new google.maps.Polyline({
      path: wayPoints,
      geodesic: true,
      strokeColor: '#1db0e6',
      strokeOpacity: 1.0,
      strokeWeight: 5,
    });
    flightPath.setMap(this.map);

    // start marker
    if (statusName !== 'Completed') {
      this.start = new google.maps.Marker({
        icon: getImage('icon-location-green-lg.png'),
        position: wayPoints[0],
        map: this.map,
      });
    } else {
      this.start = new google.maps.Marker({
        icon: getImage('icon-location-green-completed.png'),
        position: wayPoints[0],
        map: this.map,
      });
    }

    // end marker
    if (statusName !== 'Completed') {
      this.start = new google.maps.Marker({
        icon: getImage('icon-location-red-lg.png'),
        position: wayPoints[wayPoints.length - 1],
        map: this.map,
      });
    } else {
      this.start = new google.maps.Marker({
        icon: getImage('icon-location-red-completed.png'),
        position: wayPoints[wayPoints.length - 1],
        map: this.map,
      });
    }

    // current position marker
    if (statusName !== 'Completed') {
      this.drone = new google.maps.Marker({
        icon: getImage('icon-drone-current-location.png'),
        position: doneCoords,
        map: this.map,
      });
    } else {
      this.drone = new google.maps.Marker({
        icon: getImage(''),
        position: doneCoords,
        map: this.map,
      });
    }
  }

  shouldComponentUpdate() {
    // the whole logic is handled by google plugin
    return false;
  }

  render() {
    return (
      <div styleName="provider-map">
        <div styleName="map" ref={(node) => (this.node = node)} />
        {this.props.statusName !== 'Completed' &&
        <MapLegends distance={this.props.distance} />
        }
      </div>
    );
  }
}

ProviderMap.propTypes = {
  doneCoords: PropTypes.object.isRequired,
  wayPoints: PropTypes.array.isRequired,
  distance: PropTypes.string.isRequired,
  statusName: PropTypes.string.isRequired,
};


export default CSSModules(ProviderMap, styles);
