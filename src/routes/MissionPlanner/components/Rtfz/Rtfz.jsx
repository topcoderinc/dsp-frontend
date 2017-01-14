import React, {PropTypes} from 'react';
import {Marker, Polygon} from 'react-google-maps';

// define the type of region to fly zones
const types = {
  point: 'Point',
  polygon: 'Polygon',
};

export const Rtfz = ({zone}) => {
  if (zone.location.type === types.point) {
    return (
      <Marker
        options={{
          clickable: false,
          crossOnDrag: false,
        }}
        position={{lat: zone.location.coordinates[1], lng: zone.location.coordinates[0]}}
      />
    );
  }
  const polygonOptions = {...zone.style, clickable: false, geodesic: true};
  return (
    <Polygon
      options={polygonOptions}
      path={zone.location.coordinates[0].map((pair) => ({lng: pair[0], lat: pair[1]}))}
    />
  );
};

Rtfz.propTypes = {
  zone: PropTypes.object.isRequired,
};

export default Rtfz;
