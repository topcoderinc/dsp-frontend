import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import { withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps';
import _ from 'lodash';
import styles from './MissionMap.scss';

const mapConfig = {
  defaultZoom: 13,
  defaultCenter: {
    lat: -6.202180076671433,
    lng: 106.83877944946289,
  },
  options: {
    clickableIcons: false,
  },
};

const polylineConfig = {
  options: {
    clickable: false,
    strokeColor: '#1db0e6',
    strokeOpacity: 1.0,
    strokeWeight: 4,
  },
};

export const MissionGoogleMap = withGoogleMap((props) => (
  <GoogleMap
    {... mapConfig}
    ref={props.onMapLoad}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker {...marker} onDrag={(event) => props.onMarkerDrag(event, index)} />
    ))}
    <Polyline {...polylineConfig} path={props.lineMarkerPosistions} />
  </GoogleMap>
));

MissionGoogleMap.propTypes = {
  markers: PropTypes.array,
  lineMarkerPosistions: PropTypes.array,
  onMapLoad: PropTypes.func,
  onMapClick: PropTypes.func,
  onMarkerDrag: PropTypes.func,
};

export const getLineMarkerPositions = (markers) => (
  markers.slice(1).map((marker) => marker.position)
);

export class MissionMap extends Component {

  constructor(props) {
    super(props);

    this.handleMapLoad = this.handleMapLoad.bind(this);

    this.state = {
      lineMarkerPosistions: getLineMarkerPositions(props.markers),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      lineMarkerPosistions: getLineMarkerPositions(nextProps.markers),
    });
  }

  fitMapToBounds(map, markers) {
    if (markers.length) {
      const markersBounds = new google.maps.LatLngBounds();

      for (const marker of this.props.markers) {
        markersBounds.extend(marker.position);
      }

      map.fitBounds(markersBounds);
    }
  }

  handleMapLoad(map) {
    if (map) {
      this.fitMapToBounds(map, this.props.markers);
    }
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <MissionGoogleMap
          containerElement={
            <div style={{ height: '100%' }} />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.props.onMapClick}
          markers={this.props.markers}
          onMarkerDrag={(event, index) => {
            if (index !== 0) {
              this.setState((prevState) => {
                const newState = _.cloneDeep(prevState);

                newState.lineMarkerPosistions[index - 1] = event.latLng;

                return newState;
              });
            }
          }}
          lineMarkerPosistions={this.state.lineMarkerPosistions}
        />
      </div>
    );
  }
}

MissionMap.propTypes = {
  markers: PropTypes.array,
  onMapClick: PropTypes.func,
};

export default CSSModules(MissionMap, styles);
