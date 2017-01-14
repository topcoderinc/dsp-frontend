import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './Loader.scss';

// Loader generated from http://loading.io/

export const Loader = ({scale}) => (
  <div style={{transform: `scale(${scale})`}} styleName='uil-rolling-css'>
    <div>
      <div />
      <div />
    </div>
  </div>
);

Loader.propTypes = {
  scale: PropTypes.number.isRequired,
};

export default CSSModules(Loader, styles);
