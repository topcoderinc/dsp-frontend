import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Rate from 'components/Rate';
import styles from './OverallDronePerformance.scss';

export const OverallDronePerformance = ({ total, speed, easeOfuse, flight, camera }) => (
  <div styleName="overall-drone-performance">
    <header styleName="header">
      <div>
        <h3 styleName="title">Overall Drone Performance</h3>
        <Rate value={total} />
      </div>
      <div styleName="total">{total}/5</div>
    </header>
    <ul styleName="list">
      <li><div styleName="label">Speed</div><Rate value={speed} /></li>
      <li><div styleName="label">Ease of use</div><Rate value={easeOfuse} /></li>
      <li><div styleName="label">Flight performance</div><Rate value={flight} /></li>
      <li><div styleName="label">Camera performance</div><Rate value={camera} /></li>
    </ul>
  </div>
);

OverallDronePerformance.propTypes = {
  total: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  easeOfuse: PropTypes.number.isRequired,
  flight: PropTypes.number.isRequired,
  camera: PropTypes.number.isRequired,
};

export default CSSModules(OverallDronePerformance, styles);
