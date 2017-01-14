import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import ClickWithoutDrag from '../ClickWithoutDrag';
import styles from './CloudinaryGalleryItem.scss';

export const CloudinaryGalleryItem = ({type, src, onClick}) => (
  <ClickWithoutDrag onClick={onClick}>
    {type === 'image' &&
      <img src={src} alt="" styleName="image" />
    }
  </ClickWithoutDrag>
);

CloudinaryGalleryItem.propTypes = {
  type: PropTypes.oneOf(['image', 'video']).isRequired,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CSSModules(CloudinaryGalleryItem, styles);
