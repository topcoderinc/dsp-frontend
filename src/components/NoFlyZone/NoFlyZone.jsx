import React, {PropTypes} from 'react';
import {Circle, Polygon} from 'react-google-maps';

export const NoFlyZone = ({zone}) => {
  if (zone.circle) {
    return (
      <Circle
        options={zone.style}
        radius={zone.circle.radius}
        center={{
          lng: zone.circle.center[0],
          lat: zone.circle.center[1],
        }}
      />
    );
  }

  return (
    <Polygon
      options={zone.style}
      path={zone.location.coordinates[0].map((pair) => ({lng: pair[0], lat: pair[1]}))}
    />
  );
};

NoFlyZone.propTypes = {
  zone: PropTypes.object.isRequired,
};

export default NoFlyZone;
