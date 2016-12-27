import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import moment from 'moment';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from './MapHistory.scss';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const tipFormatter = (v) => moment(v).format(DATE_FORMAT);

class MapHistory extends React.Component {
  constructor(props) {
    super(props);

    this.getBounds = this.getBounds.bind(this);
    this.drawPath = this.drawPath.bind(this);
    this.filterMarkers = this.filterMarkers.bind(this);
    this.getDateBounds = this.getDateBounds.bind(this);
    this.filterLocations = this.filterLocations.bind(this);
    this.setDateRange = this.setDateRange.bind(this);

    if (props.locations.length > 0) {
      this.getDateBounds();
      this.dateRange = this.dateBounds;
    }
  }

  componentDidMount() {
    if (this.props.locations.length === 0) return;
    const bounds = this.getBounds();
    const mapSettings = {
      center: bounds.getCenter(),
      minZoom: 3,
    };

    // create map
    this.map = new google.maps.Map(this.node, mapSettings);
    this.map.fitBounds(bounds);
    this.map.addListener('zoom_changed', this.filterMarkers);

    // a overlay to translate from pixel to latlng and the reverse
    this.overlay = new google.maps.OverlayView();
    this.overlay.draw = () => {};
    this.overlay.setMap(this.map);

    // a info window to show location created date
    this.infoWindow = new google.maps.InfoWindow({
      pixelOffset: new google.maps.Size(0, -8),
    });

    this.filterLocations();
  }

  // get map's bounds based on locations
  getBounds() {
    const bounds = new google.maps.LatLngBounds();
    _.each(this.props.locations, (l) => {
      bounds.extend(_.pick(l, 'lat', 'lng'));
    });
    return bounds;
  }

  // get date bounds of locations
  getDateBounds() {
    this.dateBounds = [
      new Date(this.props.locations[0].createdAt).getTime(),
      new Date(this.props.locations[this.props.locations.length - 1].createdAt).getTime(),
    ];
  }

  // set range of date to show locations
  setDateRange(range) {
    this.dateRange = range;
    this.filterLocations();
  }

  // filter locations by date range and then draw path
  filterLocations() {
    this.locations = _.filter(this.props.locations, (l) => {
      const time = new Date(l.createdAt).getTime();
      return time >= this.dateRange[0] && time <= this.dateRange[1];
    });

    // interpolate start location if not existed
    _.each(this.props.locations, (l, i, c) => {
      const time1 = new Date(l.createdAt).getTime();
      if (time1 >= this.dateRange[0]) {
        if (time1 > this.dateRange[0]) {
          const time2 = new Date(c[i - 1].createdAt).getTime();
          const ratio = (this.dateRange[0] - time2) / (time1 - time2);
          this.locations.unshift({
            createdAt: this.dateRange[0],
            lat: c[i - 1].lat + ratio * (l.lat - c[i - 1].lat),
            lng: c[i - 1].lng + ratio * (l.lng - c[i - 1].lng),
          });
        }
        return false;
      }
      return true;
    });

    // interpolate end location if not existed
    _.eachRight(this.props.locations, (l, i, c) => {
      const time1 = new Date(l.createdAt).getTime();
      if (time1 <= this.dateRange[1]) {
        if (time1 < this.dateRange[1]) {
          const time2 = new Date(c[i + 1].createdAt).getTime();
          const ratio = (this.dateRange[1] - time1) / (time2 - time1);
          this.locations.push({
            createdAt: this.dateRange[1],
            lat: l.lat + ratio * (c[i + 1].lat - l.lat),
            lng: l.lng + ratio * (c[i + 1].lng - l.lng),
          });
        }
        return false;
      }
      return true;
    });

    this.drawPath();
  }

  // hide markers if one is too close to next
  filterMarkers() {
    this.omitMarkers = 0;
    let lastMarker;
    _.each(this.markers, (m) => {
      if (!lastMarker) {
        lastMarker = m;
        m.setVisible(true);
      } else {
        const p1 = this.overlay.getProjection().fromLatLngToDivPixel(m.getPosition());
        const p2 = this.overlay.getProjection().fromLatLngToDivPixel(lastMarker.getPosition());
        const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
        // remove some location to avoid overlap
        if (dist > 20) {
          lastMarker = m;
          m.setVisible(true);
        } else {
          m.setVisible(false);
          ++this.omitMarkers;
        }
      }
    });
    this.forceUpdate();
  }

  // draw locations path
  drawPath() {
    // clear exsiting path
    if (this.path) {
      this.path.setMap(null);
    }

    // create new path based on filtered locations
    this.path = new google.maps.Polyline({
      path: _.map(this.locations, (l) => (_.pick(l, 'lat', 'lng'))),
      map: this.map,
      strokeColor: '#f00',
      strokeWeight: 2,
    });

    // clear exsiting markers
    if (this.markers) {
      _.each(this.markers, (m) => { m.setMap(null); });
    }

    // create markers based on filtered locations
    this.markers = _.map(this.locations, (l, i) => {
      const marker = new google.maps.Marker({
        crossOnDrag: false,
        cursor: 'pointer',
        position: _.pick(l, 'lat', 'lng'),
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillOpacity: 0.5,
          fillColor: i === 0 ? '#3e0' : '#f00',
          strokeOpacity: 1.0,
          strokeColor: '#fff000',
          strokeWeight: 1.0,
          scale: 10,
        },
        map: this.map,
      });

      // show info window when mouse hover
      marker.addListener('mouseover', () => {
        this.infoWindow.setContent(new moment(l.createdAt).format(DATE_FORMAT));
        this.infoWindow.setPosition(marker.getPosition());
        this.infoWindow.open(this.map);
      });
      marker.addListener('mouseout', () => {
        this.infoWindow.close();
      });

      return marker;
    });

    this.filterMarkers();
  }

  render() {
    return (
      this.props.locations.length === 0 ?
      (<div styleName="no-history">No location history</div>) :
      (<div styleName="history-wrap">
        <div styleName="map-history" ref={(node) => { this.node = node; }} />
        <div styleName="history-toolbar">
          <div styleName="slider">
            <Slider
              range min={this.dateBounds[0]} max={this.dateBounds[1]} defaultValue={this.dateBounds}
              tipFormatter={tipFormatter} onChange={this.setDateRange}
            />
          </div>
          <div styleName="info">
            <div>Showing locations from <strong>{moment(this.dateRange[0]).format(DATE_FORMAT)}</strong> to <strong>{moment(this.dateRange[1]).format(DATE_FORMAT)}</strong></div>
            {this.omitMarkers > 0 ? (<div>{`${this.omitMarkers} locations are omitted, zoom in to show more`}</div>) : null}
          </div>
        </div>
      </div>)
    );
  }
}

MapHistory.propTypes = {
  locations: PropTypes.array.isRequired,
};

export default CSSModules(MapHistory, styles);
