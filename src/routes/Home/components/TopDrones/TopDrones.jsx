import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './TopDrones.scss';
import TopDronesItem from '../TopDronesItem';
import HomeSectionHeader from '../HomeSectionHeader';

const TopDrones = (props) => (
  <div styleName="popular-drones-slides">
    <HomeSectionHeader
      title={'Top Drone Provider Nearby Jakarta, Indonesia'}
      seeAll={'See all providers'}
    />

    <div styleName="drones-slides">
      {
        props.popularDrones.map((drone, i) => (
          i < 4 && <div key={i}><TopDronesItem droneInfo={drone} /></div>
        ))
      }
    </div>
  </div>
);

TopDrones.propTypes = {
  popularDrones: PropTypes.array.isRequired,
};

export default CSSModules(TopDrones, styles);
