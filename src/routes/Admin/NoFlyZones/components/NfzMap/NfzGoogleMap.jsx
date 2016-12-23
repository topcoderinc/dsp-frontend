import React, {PropTypes} from 'react';
import {withGoogleMap, GoogleMap} from 'react-google-maps';
import NoFlyZone from 'components/NoFlyZone';
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager';
import _ from 'lodash';
import {GOOGLE_MAPS_BOUNDS_TIMEOUT} from 'Const';

const mapConfig = {
  defaultZoom: 18,
  defaultCenter: {
    lat: 38.9070206,
    lng: -77.0369928,
  },
};

class NfzGoogleMap extends React.Component {
  render() {
    const {loadNfz, zones, addZone} = this.props;

    return (
      <GoogleMap
        ref={(map) => (this.map = map)}
        onBoundsChanged={_.debounce(() => {
          const bounds = this.map.getBounds().toJSON();
          loadNfz(bounds);
        }, GOOGLE_MAPS_BOUNDS_TIMEOUT)}
        {...mapConfig}
      >
        <DrawingManager
          onCircleComplete={(circle) => {
            const center = circle.getCenter();
            addZone({
              circle: {
                center: [center.lng(), center.lat()],
                radius: circle.getRadius(),
              },
            });
            circle.setMap(null);
          }}
          onPolygonComplete={(polygon) => {
            const coordinates = polygon.getPath().getArray().map((point) => [point.lng(), point.lat()]);
            addZone({coordinates});
            polygon.setMap(null);
          }}
          options={{
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: ['circle', 'polygon'],
            },
          }}
        />
        {zones.map((zone) => <NoFlyZone key={zone.id} zone={zone} />)}
      </GoogleMap>
    );
  }
}

NfzGoogleMap.propTypes = {
  loadNfz: PropTypes.func.isRequired,
  addZone: PropTypes.func.isRequired,
  zones: PropTypes.array.isRequired,
};

export default withGoogleMap(NfzGoogleMap);
