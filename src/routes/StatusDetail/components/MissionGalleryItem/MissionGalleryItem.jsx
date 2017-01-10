import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './MissionGalleryItem.scss';

export const MissionGalleryItem = ({imageUrl}) => (
  <div styleName="mission-gallery-item">
    <img src={imageUrl} alt="" styleName="image" />
  </div>
);

MissionGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};

export default CSSModules(MissionGalleryItem, styles);
