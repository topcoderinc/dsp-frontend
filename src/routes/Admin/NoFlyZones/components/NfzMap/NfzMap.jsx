import React from 'react';
import NfzGoogleMap from './NfzGoogleMap';

export const NfzMap = (props) => (
  <div style={{height: '100%'}}>
    <NfzGoogleMap
      containerElement={
        <div style={{height: '100%'}} />
      }
      mapElement={
        <div style={{height: '100%'}} />
      }
      {...props}
    />
  </div>
);

export default NfzMap;
