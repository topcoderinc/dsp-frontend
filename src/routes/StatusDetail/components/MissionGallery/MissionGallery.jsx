import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Slider from 'react-slick';
import _ from 'lodash';
import MissionGalleryItem from '../MissionGalleryItem';
import styles from './MissionGallery.scss';

const sliderProps = {
  infinite: false,
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  vertical: false,
  variableWidth: false,
};

export const MissionGallery = ({title, items, note}) => (
  <div styleName="mission-gallery">
    <header styleName="header">
      <h2 styleName="title">{title}</h2>
      {note && <p styleName="note">{note}</p>}
    </header>
    {items && items.length ? (
      <Slider {...sliderProps}>
        {_.chunk(items, 4).map((slideItems, slideIndex) => (
          <div key={slideIndex} styleName="slide">
            <div styleName="slide-inner">
              {slideItems.map((item, itemIndex) => (
                <div key={itemIndex} styleName="item">
                  <MissionGalleryItem {...item} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </Slider>
    ) : (
      <p styleName="no-items">No photos or videos until mission’s completed.</p>
    )}
  </div>
);

MissionGallery.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape(MissionGalleryItem.propTypes)
  ),
  note: PropTypes.string,
};

export default CSSModules(MissionGallery, styles);
