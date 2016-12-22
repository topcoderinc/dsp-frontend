import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './MissionGallerySlides.scss';
import Slider from 'react-slick';


const getImage = (name) => `${window.location.origin}/img/slides/${name}`;


const MissionGallerySlides = (props) => {
  const settings = {
    customPaging(i) {
      return <div>{i}</div>;
    },
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
  };
  const {missionSlides} = props;
  return (
    <div styleName="mission-gallery-slides">
      <Slider {...settings}>
        {missionSlides.map((slide, index) => <div key={index}><img src={getImage(slide.imagSrc)} alt="slide" /></div>)}
      </Slider>
    </div>
  );
};


MissionGallerySlides.propTypes = {
  missionSlides: PropTypes.array.isRequired,
};

export default CSSModules(MissionGallerySlides, styles);
