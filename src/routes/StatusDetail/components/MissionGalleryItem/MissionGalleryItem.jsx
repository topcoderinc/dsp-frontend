import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './MissionGalleryItem.scss';

export const MissionGalleryItem = ({type, src}) => (
  <div styleName="mission-gallery-item">
    {type === 'image' &&
      <img src={src} alt="" styleName="image" />
    }
  </div>
);

MissionGalleryItem.propTypes = {
  type: PropTypes.oneOf(['image', 'video']).isRequired,
  src: PropTypes.string.isRequired,
};

export default CSSModules(MissionGalleryItem, styles);
