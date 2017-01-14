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

const types = {
  point: 'Point',
  polygon: 'Polygon',
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
    // only required if the user location is updated
    // because bounds for markers and rtfzs are already set in handleMapLoad
    const shouldUpdateBound = !_.isEqual(this.props.userLocation, nextProps.userLocation);
    if (shouldUpdateBound) {
      const {markers, rtfzs, userLocation} = nextProps;
      const bounds = this.getMapBounds(markers, rtfzs, userLocation);
      this.map.fitBounds(bounds);
    }
  }

  /**
   * Intelligently determine the map bounds to fit the map
   * The order of precedence
   * 1. If markers are defined return the bounds for markers
   * 2. If markers are undefined and rtfzs are defined than return the bounds for rtfzs
   * 3. If mission items and rtfzs are undefined than return the bounds for current user location
   *    if user denied location than return the default bounds
   * 4. If markers and rtfzs are defined return bounds for markers
   *
   * @param  {Array}    markers         the list of markers to get the bounds
   * @param  {Array}    rtfzs           the list of rtfzs to get the bounds
   * @param  {Object}   userLocation    the user location to get the bounds
   */
  getMapBounds(markers, rtfzs, userLocation) {
    const isMarkers = markers && markers.length > 0;
    const isRtfzs = rtfzs && rtfzs.length > 0;
    const isUserLocation = userLocation && _.has(userLocation, 'lat') && _.has(userLocation, 'lng');
    let bounds;
    if (isMarkers) {
      bounds = new google.maps.LatLngBounds();
      // bounds for markers
      markers.forEach((marker) => {
        bounds.extend(marker.position);
      });
    } else if (!isMarkers && isRtfzs) {
      bounds = new google.maps.LatLngBounds();
      // bounds for rtfzs
      rtfzs.forEach((rtfz) => {
        if (rtfz.location.type === types.point) {
          bounds.extend({lat: rtfz.location.coordinates[1], lng: rtfz.location.coordinates[0]});
        } else if (rtfz.location.type === types.polygon) {
          rtfz.location.coordinates.forEach((coor) => {
            coor.forEach((point) => {
              bounds.extend({lat: point[1], lng: point[0]});
            });
          });
        }
      });
    } else if (!isMarkers && !isRtfzs && isUserLocation) {
      bounds = new google.maps.LatLngBounds();
      // bounds for user location
      bounds.extend(userLocation);
    }
    return bounds;
  }

  handleMapLoad(map) {
    const {markers, rtfzs, userLocation} = this.props;
    this.map = map;
    if (map) {
      const bounds = this.getMapBounds(markers, rtfzs, userLocation);
      // if bounds are defined than only fit map to bounds, otherwise keep default bounds
      if (bounds) {
        map.fitBounds(bounds);
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
  // the current cached user location
  userLocation: PropTypes.object,
};

export default CSSModules(MissionMap, styles);
