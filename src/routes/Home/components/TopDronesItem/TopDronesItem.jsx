import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './TopDronesItem.scss';
import Button from 'components/Button';
import ProvidersGridTooltips from '../ProvidersGridTooltips';

const getImage = (name) => `${window.location.origin}/img/drones/${name}`;

export const TopDronesItem = ({droneInfo}) => (
  <div styleName="popular-drone-slider-item">
    { droneInfo.sponsored && <div styleName="sponsored">Sponsored</div> }
    <figure>
      <img src={getImage(droneInfo.imgSrc)} alt="drone picture" styleName="drone-img" />
      <figcaption>
        <div styleName="drone-name">
          <div>
            <ProvidersGridTooltips droneInfo={droneInfo} />
          </div>
        </div>
        <div styleName="job-rating">
          <p styleName="completed-job">Completed Job: {droneInfo.completedJob}</p>
          <div styleName="rating"><i styleName="icon-rating" /></div>
        </div>
      </figcaption>
    </figure>
  </div>
);

TopDronesItem.propTypes = {
  droneInfo: PropTypes.object.isRequired,
};

export default CSSModules(TopDronesItem, styles);
