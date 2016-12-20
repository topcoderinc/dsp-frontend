import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import styles from './MissionGallerySlides.scss';

const Slider = require('react-slick');

const getImage = (name) => `${window.location.origin}/img/slides/${name}`;


/*
* MissionGallerySlides
*/

class MissionGallerySlides extends Component {
  componentDidMount() {
  }
  render() {
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
    const { missionSlides } = this.props;
    return (
      <div styleName="mission-gallery-slides">
        <Slider {...settings}>
          {missionSlides.map((slide, index) => <div key={index}><img src={getImage(slide.imagSrc)} alt="slide" /></div>)}
        </Slider>
      </div>
    );
  }
}

MissionGallerySlides.propTypes = {
  missionSlides: PropTypes.array.isRequired,
};

export default CSSModules(MissionGallerySlides, styles);
