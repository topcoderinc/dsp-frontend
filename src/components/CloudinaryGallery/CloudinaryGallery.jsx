import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Slider from 'react-slick';
import _ from 'lodash';
import Measure from 'react-measure';
import Lightbox from 'react-image-lightbox';
import config from '../../config';
import styles from './CloudinaryGallery.scss';
import CloudinaryGalleryItem from './CloudinaryGalleryItem';

const CLOUDINARY_PREFIX = `http://res.cloudinary.com/${config.CLOUDINARY_ACCOUNT_NAME}/image/fetch/`;

const sliderProps = {
  infinite: false,
  dots: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  vertical: false,
  variableWidth: false,
};

// css margin
const MARGIN = 8;

class CloudinaryGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  render() {
    const {items, width, count, height, noItemsText} = this.props;
    const {isOpen, photoIndex} = this.state;

    if (!items || !items.length) {
      return (
        <p styleName="no-items">{noItemsText}</p>
      );
    }
    const itemWidth = Math.floor(width / count) - 2 * MARGIN;
    const resizedItems = items.map((item) => ({
      ...item,
      // c_fill = crop with retaining original proportions
      // g_auto = auto detect point of interests
      // see http://cloudinary.com/blog/introducing_smart_cropping_intelligent_quality_selection_and_automated_responsive_images#automatic_content_aware_cropping_g_auto
      src: `${CLOUDINARY_PREFIX}w_${itemWidth},h_${height},c_fill,g_auto/${item.src}`,
    }));
    return (
      <div styleName="cloudinary-gallery">
        {isOpen &&
          <Lightbox
            mainSrc={items[photoIndex].src}
            nextSrc={items[(photoIndex + 1) % items.length].src}
            prevSrc={items[(photoIndex + items.length - 1) % items.length].src}
            onCloseRequest={() => this.setState({isOpen: false})}
            onMovePrevRequest={() => this.setState({
              photoIndex: (photoIndex + items.length - 1) % items.length,
            })}
            onMoveNextRequest={() => this.setState({
              photoIndex: (photoIndex + 1) % items.length,
            })}
          />
        }
        <Slider {...sliderProps}>
          {_.chunk(resizedItems, count).map((slideItems, slideIndex) => (
            <div key={slideIndex} styleName="slide">
              <div styleName="slide-inner">
                {slideItems.map((item, itemIndex) => (
                  <div key={itemIndex} styleName="item">
                    <CloudinaryGalleryItem
                      {...item}
                      onClick={() => {
                        this.setState({
                          isOpen: true,
                          photoIndex: slideIndex * count + itemIndex,
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}

CloudinaryGallery.propTypes = {
  items: PropTypes.array.isRequired,
  width: PropTypes.number,
  count: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  noItemsText: PropTypes.string.isRequired,
};

// HOC wrapping

const CloudinaryGalleryWithStyles = CSSModules(CloudinaryGallery, styles);

const CloudinaryGalleryWithMeasure = (props) => (
  <Measure>
    {
      ({width}) => <CloudinaryGalleryWithStyles {...props} width={width} />
    }
  </Measure>
);
export default CloudinaryGalleryWithMeasure;
