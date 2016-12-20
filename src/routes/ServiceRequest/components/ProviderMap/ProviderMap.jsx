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
    const { doneCoords, wayPoints } = this.props;

    this.map = new google.maps.Map(this.node, {
      zoom: 16,
      center: doneCoords,
    });

    const flightPath = new google.maps.Polyline({
      path: wayPoints,
      geodesic: true,
      strokeColor: '#1db0e6',
      strokeOpacity: 1.0,
      strokeWeight: 5,
    });
    flightPath.setMap(this.map);

    this.start = new google.maps.Marker({
      icon: getImage('icon-location-green-lg.png'),
      position: wayPoints[0],
      map: this.map,
    });

    this.end = new google.maps.Marker({
      icon: getImage('icon-location-red-lg.png'),
      position: wayPoints[wayPoints.length - 1],
      map: this.map,
    });

    this.drone = new google.maps.Marker({
      icon: getImage('icon-drone-location-lg.png'),
      position: doneCoords,
      map: this.map,
    });
  }

  shouldComponentUpdate() {
    // the whole logic is handled by google plugin
    return false;
  }

  render() {
    return (
      <div styleName="provider-map">
        <div styleName="map" ref={(node) => (this.node = node)} />
        <MapLegends distance={this.props.distance} />
      </div>
    );
  }
}

ProviderMap.propTypes = {
  doneCoords: PropTypes.object.isRequired,
  wayPoints: PropTypes.array.isRequired,
  distance: PropTypes.string.isRequired,
};


export default CSSModules(ProviderMap, styles);
