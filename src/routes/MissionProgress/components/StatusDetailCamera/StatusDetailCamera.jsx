import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './StatusDetailCamera.scss';


/*
* StatusDetailCamera
*/

export const StatusDetailCamera = ({statusName}) => (
  <div styleName="status-detail-camera">
    {statusName !== 'Completed' ? (
      <div styleName="title">Real Time Camera</div>
    ) : (
      <div styleName="title">Mission Video</div>
    )}

    <div styleName="camera-view">

      {statusName !== 'Completed' ? (
        <a href="javascript:;"><div styleName="camera-thumb-front" className={styles.cameraThumb} /></a>
        ) : (
          <a href="javascript:;"><div styleName="video-thumb-front" className={styles.cameraThumb} /></a>
        )}
      <div styleName="camera-type">
        <div styleName="type">Front Camera</div>
        <a href="javascript:;" styleName="preview-btn">Full Preview</a>
      </div>
    </div>
    {/* camera-view end */}
    <div styleName="camera-view">
      {statusName !== 'Completed' ? (
        <div styleName="camera-thumb-back" className={styles.cameraThumb} />
        ) : (
          <div styleName="video-thumb-back" className={styles.cameraThumb} />
        )}
      <div styleName="camera-type">
        <div styleName="type">Back Camera</div>
        <a href="javascript:;" styleName="preview-btn">Full Preview</a>
      </div>
    </div>
    {/* camera-view end */}
  </div>
);

StatusDetailCamera.propTypes = {
  statusName: PropTypes.string.isRequired,
};

export default CSSModules(StatusDetailCamera, styles);
