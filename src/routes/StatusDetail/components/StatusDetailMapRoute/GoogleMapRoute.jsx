import React, {PropTypes, Component} from 'react';
import _ from 'lodash';
import {withGoogleMap, GoogleMap, Polygon, Marker} from 'react-google-maps';

const getImage = (name) => `${window.location.origin}/img/${name}`;

class GoogleMapRoute extends Component {

  componentDidMount() {
    const {zones, startLocation, endLocation} = this.props;
    const bounds = new google.maps.LatLngBounds();

    if (zones) {
      _.forEach(zones, (z) => {
        if (z.location.type === 'Point') {
          bounds.extend({
            lng: z.location.coordinates[0],
            lat: z.location.coordinates[1],
          });
        } else {
          _.forEach(z.location.coordinates[0], (c) => {
            bounds.extend({
              lng: c[0],
              lat: c[1],
            });
          });
        }
      });
    }

    if (startLocation) {
      bounds.extend(startLocation);
    }

    if (endLocation) {
      bounds.extend(endLocation);
    }

    this.map.fitBounds(bounds);
  }

  render() {
    const {zones, startLocation, endLocation} = this.props;
    return (
      <GoogleMap
        ref={(map) => (this.map = map)}
        zoom={16}
        center={{lat: 0, lng: 0}}
        options={{
          minZoom: 2,
        }}
      >
        {
          endLocation ?
          (<Marker
            icon={getImage('icon-location-green-lg.png')}
            position={endLocation}
          />) : null
        }
        { startLocation ?
          (<Marker
            icon={getImage('icon-location-red-lg.png')}
            position={startLocation}
          />) : null
        }

        {
          zones ?
          zones.map((zone, i) =>
          (zone.location.type === 'Point' ?
            <Marker
              key={i}
              position={{
                lng: zone.location.coordinates[0],
                lat: zone.location.coordinates[1],
              }}
            />
              :
            <Polygon
              key={i}
              options={zone.style}
              path={zone.location.coordinates[0].map((pair) => ({lng: pair[0], lat: pair[1]}))}
            />)
          ) : null
        }
      </GoogleMap>
    );
  }
}

GoogleMapRoute.propTypes = {
  zones: PropTypes.array,
  startLocation: PropTypes.object,
  endLocation: PropTypes.object,
};

export default withGoogleMap(GoogleMapRoute);
