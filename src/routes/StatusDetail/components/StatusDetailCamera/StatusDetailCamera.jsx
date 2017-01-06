import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './StatusDetailCamera.scss';

export const StatusDetailCamera = ({title, streamSrc}) => (
  <div styleName="status-detail-camera">
    {streamSrc ? (
      <img src={streamSrc} styleName="embeded" alt={title} />
    ) : (
      <div styleName="not-availabel"><span>Camera currently not available</span></div>
    )}
    <span styleName="info">
      <span styleName="title">{title}</span>
      {streamSrc && <span styleName="full-preview">Full Preview</span>}
    </span>
  </div>
);

StatusDetailCamera.propTypes = {
  title: PropTypes.string.isRequired,
  streamSrc: PropTypes.string,
};

export default CSSModules(StatusDetailCamera, styles);
