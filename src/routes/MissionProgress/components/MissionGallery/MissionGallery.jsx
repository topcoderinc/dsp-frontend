import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './MissionGallery.scss';
import MissionGallerySlides from '../MissionGallerySlides';


/*
* MissionGallery
*/

export const MissionGallery = ({statusName, missionSlides}) => (
  <div styleName="mission-gallery">
    <div styleName="gallery-header">
      <div styleName="title">Mission Gallery</div>
      {statusName === 'Completed' &&
      <div styleName="filmed-by"><i styleName="icon-drone-black" />Filmed by Drone Maniac #1 in Los Angeles, CA</div>
      }

    </div>
    {/* gallery-header end */}

    {statusName !== 'Completed' ? (
      <div styleName="no-photo-video">
        No photos or videos until mission’s completed.
      </div>
    ) : (
      <MissionGallerySlides missionSlides={missionSlides} />
    )}


  </div>
);

MissionGallery.propTypes = {
  statusName: PropTypes.string.isRequired,
  missionSlides: PropTypes.array.isRequired,

};

export default CSSModules(MissionGallery, styles);
