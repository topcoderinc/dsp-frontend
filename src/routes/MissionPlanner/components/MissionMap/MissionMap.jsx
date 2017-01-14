import React, {PropTypes, Component} from 'react';
import CSSModules from 'react-css-modules';
import {withGoogleMap, GoogleMap, Marker, Polyline} from 'react-google-maps';
import _ from 'lodash';
import NoFlyZone from 'components/NoFlyZone';
import Rtfz from '../Rtfz';
import {GOOGLE_MAPS_BOUNDS_TIMEOUT} from 'Const';
import styles from './MissionMap.scss';

// default center location for mission Planner
const mapConfig = {
  defaultZoom: 13,
  defaultCenter: {
    lat: 40.01,
    lng: -105.27,
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
    onBoundsChanged={props.onBoundsChanged}
    ref={props.onMapLoad}
    options={{
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
        position: google.maps.ControlPosition.TOP_CENTER,
      },
    }}
    onClick={props.onMapClick}
  >
    {props.markers.map((marker, index) => (
      <Marker key={index} {...marker} onDrag={(event) => props.onMarkerDrag(event, index)} />
    ))}
    <Polyline {...polylineConfig} path={props.lineMarkerPositions} />
    {props.noFlyZones.map((zone) => <NoFlyZone key={zone.id} zone={zone} />)}
    {props.rtfzs && props.rtfzs.filter((single) => single.show === true).map((rtfz) => <Rtfz key={rtfz._id} zone={rtfz} />)}
  </GoogleMap>
));

MissionGoogleMap.propTypes = {
  markers: PropTypes.array,
  lineMarkerPositions: PropTypes.array,
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
      lineMarkerPositions: getLineMarkerPositions(props.markers),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      lineMarkerPositions: getLineMarkerPositions(nextProps.markers),
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
    this.map = map;
    if (map) {
      if (this.props.markers.length > 0) {
        this.fitMapToBounds(map, this.props.markers);
      } else {
        navigator.geolocation.getCurrentPosition((pos) => {
          map.panTo({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
          null,
          {timeout: 60000}
        );
      }
    }
  }

  render() {
    return (
      <div style={{height: '100%'}}>
        <MissionGoogleMap
          containerElement={
            <div style={{height: '100%'}} />
          }
          mapElement={
            <div style={{height: '100%'}} />
          }
          onMapLoad={this.handleMapLoad}
          onMapClick={this.props.onMapClick}
          markers={this.props.markers}
          onBoundsChanged={_.debounce(() => {
            const bounds = this.map.getBounds().toJSON();
            this.props.loadNfz(bounds);
          }, GOOGLE_MAPS_BOUNDS_TIMEOUT)}
          onMarkerDrag={(event, index) => {
            if (index !== 0) {
              this.setState((prevState) => {
                const newState = _.cloneDeep(prevState);

                newState.lineMarkerPositions[index - 1] = event.latLng;

                return newState;
              });
            }
          }}
          lineMarkerPositions={this.state.lineMarkerPositions}
          noFlyZones={this.props.noFlyZones}
          rtfzs={this.props.rtfzs}
        />
      </div>
    );
  }
}

MissionMap.propTypes = {
  markers: PropTypes.array,
  onMapClick: PropTypes.func,
  loadNfz: PropTypes.func.isRequired,
  noFlyZones: PropTypes.array.isRequired,
  rtfzs: PropTypes.array,
};

export default CSSModules(MissionMap, styles);
