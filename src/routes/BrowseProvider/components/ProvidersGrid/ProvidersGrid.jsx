import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './ProvidersGrid.scss';
import ProvidersGridItem from '../ProvidersGridItem';

const ProvidersGrid = (props) => (
  <div styleName="popular-drones-slides">

    <div styleName="drones-slides" className="drones-slides">
      {
        props.providers.map((drone, i) => (
          <div key={i}><ProvidersGridItem droneInfo={drone} /></div>
        ))
      }
    </div>
  </div>
);

ProvidersGrid.propTypes = {
  providers: PropTypes.array.isRequired,
};

export default CSSModules(ProvidersGrid, styles);
