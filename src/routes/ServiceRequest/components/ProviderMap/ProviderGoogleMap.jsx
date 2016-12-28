import React, {PropTypes} from 'react';
import {withGoogleMap, GoogleMap, Polygon, Polyline, Marker} from 'react-google-maps';
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager';

const getImage = (name) => `${window.location.origin}/img/${name}`;

class ProviderGoogleMap extends React.Component {
  render() {
    const {doneCoords, wayPoints, addZone, zones} = this.props;

    return (
      <GoogleMap
        ref={(map) => (this.map = map)}
        zoom={16}
        center={doneCoords}
      >
        <Polyline
          path={wayPoints}
          options={{
            geodesic: true,
            strokeColor: '#1db0e6',
            strokeOpacity: 1.0,
            strokeWeight: 5,
          }}
        />
        <Marker
          icon={getImage('icon-location-green-lg.png')}
          position={wayPoints[0]}
        />
        <Marker
          icon={getImage('icon-location-red-lg.png')}
          position={wayPoints[wayPoints.length - 1]}
        />
        <Marker
          icon={getImage('icon-drone-location-lg.png')}
          position={doneCoords}
        />

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
  doneCoords: PropTypes.object.isRequired,
  wayPoints: PropTypes.array.isRequired,
  addZone: PropTypes.func.isRequired,
  zones: PropTypes.array.isRequired,
};


export default withGoogleMap(ProviderGoogleMap);
