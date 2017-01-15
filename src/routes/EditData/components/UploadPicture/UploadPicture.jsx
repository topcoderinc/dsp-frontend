import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './UploadPicture.scss';
import cn from 'classnames';
import Loader from 'components/Loader';

/*
* UploadPicture
*/

export const UploadPicture = ({picture, removePicture}) => {
  const {status, src, file} = picture;
  const onRemove = (e) => {
    if (picture.status === 'deleting') {
      return;
    }
    e.preventDefault();
    removePicture(picture);
  };
  return (
    <li styleName={cn('upload-picture', {loading: status !== 'uploaded'})}>
      {
        file != null && file.type === 'image' ? (
          <img src={src} alt="uploaded" />
        ) : null
      }
      {
        file != null && file.type === 'pdf' ? (
          <a target="_blank" href={src} styleName='pdf'><span>PDF</span></a>
        ) : null
      }
      {
        file === null || (file.type != 'image' && file.type != 'pdf') ? (
          <a target="_blank" href={src} styleName='file'><span>{file.type}</span></a>
        ) : null
      }
      {
        file != null ? (
          <span>{file.name}</span>
        ) : null
      }
      <div styleName="loader">
        <Loader scale={0.25} />
      </div>
      <a
        href="javascript:"
        onClick={onRemove}
      >
        <i styleName="icon-delete-pic" />{status === 'uploading' ? 'Cancel' : 'Delete'}
      </a>
    </li>
  );
};

UploadPicture.propTypes = {
  picture: PropTypes.object.isRequired,
  removePicture: PropTypes.func.isRequired,
};

export default CSSModules(UploadPicture, styles, {allowMultiple: true});
