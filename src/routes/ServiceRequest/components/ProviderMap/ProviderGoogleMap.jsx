import React, {PropTypes} from 'react';
import _ from 'lodash';
import {withGoogleMap, GoogleMap, Polygon, Marker} from 'react-google-maps';
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager';

const getImage = (name) => `${window.location.origin}/img/${name}`;

const defaultCenter = {
  lat: 38.9050206,
  lng: -77.03699279999999,
};

class ProviderGoogleMap extends React.Component {
  constructor() {
    super();

    this.geocoder = new google.maps.Geocoder();
  }

  clickMap(e) {
    const {selectingAddress, setAddress} = this.props;
    if (selectingAddress) {
      const payload = {
        type: selectingAddress,
        coor: e.latLng,
      };
      setAddress(payload);
      this.geocoder.geocode({
        location: e.latLng,
      }, (res) => {
        if (res && res.length > 0) {
          _.forEach(res[0].address_components, (c) => {
            if (_.includes(c.types, 'locality')) {
              payload.city = c.long_name;
            } else if (_.includes(c.types, 'route')) {
              payload.line1 = c.long_name;
            } else if (_.includes(c.types, 'postal_code')) {
              payload.postalCode = c.long_name;
            } else if (_.includes(c.types, 'administrative_area_level_1')) {
              payload.state = c.long_name;
            } else if (_.includes(c.types, 'country')) {
              // fallback
              payload.state = payload.state || c.long_name;
            }
          });
          setAddress(payload);
        }
      });
    }
  }

  render() {
    const {addZone, zones, startLocation, endLocation, selectingAddress} = this.props;

    return (
      <GoogleMap
        ref={(map) => (this.map = map)}
        zoom={16}
        center={defaultCenter}
        onClick={this.clickMap.bind(this)}
        options={{
          draggableCursor: selectingAddress ? 'crosshair' : 'hand',
          minZoom: 2,
        }}
      >
        {
          endLocation ?
          (<Marker
            icon={getImage('icon-location-green-lg.png')}
            position={endLocation.coor}
          />) : null
        }
        { startLocation ?
          (<Marker
            icon={getImage('icon-location-red-lg.png')}
            position={startLocation.coor}
          />) : null
        }

        <DrawingManager
          onPolygonComplete={(polygon) => {
            const coordinates = polygon.getPath().getArray().map((point) => [point.lng(), point.lat()]);
            addZone({coordinates});
            polygon.setMap(null);
          }}
          onMarkerComplete={(marker) => {
            addZone({
              point: [marker.position.lng(), marker.position.lat()],
            });
            marker.setMap(null);
          }}
          options={{
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: ['polygon', 'marker'],
            },
          }}
        />

        {zones.map((zone) =>
          (zone.location.type === 'Point' ?
            <Marker
              key={zone.id}
              position={{
                lng: zone.location.coordinates[0],
                lat: zone.location.coordinates[1],
              }}
            />
              :
            <Polygon
              key={zone.id}
              options={zone.style}
              path={zone.location.coordinates[0].map((pair) => ({lng: pair[0], lat: pair[1]}))}
            />)
        )}
      </GoogleMap>
    );
  }
}

ProviderGoogleMap.propTypes = {
  addZone: PropTypes.func.isRequired,
  zones: PropTypes.array.isRequired,
  selectingAddress: PropTypes.string,
  setAddress: PropTypes.func,
  startLocation: PropTypes.object,
  endLocation: PropTypes.object,
};


export default withGoogleMap(ProviderGoogleMap);
