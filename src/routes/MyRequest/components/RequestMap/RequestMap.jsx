import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './RequestMap.scss';

class RequestMap extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.node, {
      zoom: 16,
      center: {
        lat: 38.9050206,
        lng: -77.03699279999999,
      },
    });
  }

  shouldComponentUpdate() { // eslint-disable-line lodash/prefer-constant
    // the whole logic is handled by google plugin
    return false;
  }

  render() {
    return (
      <div styleName="provider-map">
        <div styleName="map" ref={(node) => (this.node = node)} />
      </div>
    );
  }
}

RequestMap.propTypes = {
};


export default CSSModules(RequestMap, styles);
