import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import MapLegends from '../MapLegends';
import styles from './ProviderMap.scss';

const getImage = (name) => `${window.location.origin}/img/${name}`;


/*
* ProviderMap
*/

class ProviderMap extends React.Component {

  componentDidMount() {
    const {myDrons} = this.props;

    this.map = new google.maps.Map(this.node, {
      zoom: 7,
      center: myDrons[0],
      mapTypeControl: false,
      zoomControl: false,
      streetViewControl: false,
    });

    this.start = new google.maps.Marker({
      icon: getImage('icon-standby-drone.png'),
      position: myDrons[0],
      map: this.map,
    });

    this.end = new google.maps.Marker({
      icon: getImage('icon-booked-drone.png'),
      position: myDrons[1],
      map: this.map,
    });

    this.drone = new google.maps.Marker({
      icon: getImage('icon-error-drone.png'),
      position: myDrons[2],
      map: this.map,
    });

    this.start = new google.maps.Marker({
      icon: getImage('icon-standby-drone.png'),
      position: myDrons[3],
      map: this.map,
    });

    this.end = new google.maps.Marker({
      icon: getImage('icon-booked-drone.png'),
      position: myDrons[4],
      map: this.map,
    });

    this.drone = new google.maps.Marker({
      icon: getImage('icon-error-drone.png'),
      position: myDrons[5],
      map: this.map,
    });
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
  myDrons: PropTypes.array.isRequired,
};


export default CSSModules(ProviderMap, styles);
