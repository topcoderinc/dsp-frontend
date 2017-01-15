import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import ClickWithoutDrag from '../ClickWithoutDrag';
import styles from './CloudinaryGalleryItem.scss';

export const CloudinaryGalleryItem = ({type, src, onClick, height}) => (
  <ClickWithoutDrag onClick={onClick}>
    {type === 'image' &&
      <img src={src} alt="" styleName="image" />
    }
    {
      type !== 'image' &&
      <div styleName="other-type" style={{'min-height': height}}>
        <span>{type}</span>
      </div>
    }
  </ClickWithoutDrag>
);

CloudinaryGalleryItem.propTypes = {
  type: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
};

export default CSSModules(CloudinaryGalleryItem, styles);
