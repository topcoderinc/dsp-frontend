import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './PopularDronesSlides.scss';
import PopularDroneSliderItem from '../PopularDroneSliderItem';
import HomeSectionHeader from '../HomeSectionHeader';
import Slider from 'react-slick';

const PopularDronesSlides = (props) => {
  const settings = {
    customPaging(i) {
      return <div>{i}</div>;
    },
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
  };
  return (
    <div styleName="popular-drones-slides">
      <HomeSectionHeader
        title={'Popular Drone Services Nearby Jakarta, Indonesia'}
        seeAll={'See all popular drones'}
      />

      <div className="drones-slides">
        <Slider {...settings}>
          {
            props.popularDrones.map((drone, i) => (
              <div key={i}><PopularDroneSliderItem droneInfo={drone} /></div>
            ))
          }
        </Slider>
      </div>
    </div>
  );
};

PopularDronesSlides.propTypes = {
  popularDrones: PropTypes.array.isRequired,
};

export default CSSModules(PopularDronesSlides, styles);
