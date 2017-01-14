import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './UploadPicture.scss';
import cn from 'classnames';
import Loader from 'components/Loader';

/*
* UploadPicture
*/

export const UploadPicture = ({picture, removePicture}) => {
  const {status, src} = picture;
  const onRemove = (e) => {
    if (picture.status === 'deleting') {
      return;
    }
    e.preventDefault();
    removePicture(picture);
  };
  return (
    <li styleName={cn('upload-picture', {loading: status !== 'uploaded'})}>
      <img src={src} alt="uploaded" />
      <div styleName="loader">
        <Loader scale={0.25} />
      </div>
      <a
        href="javascript:"
        onClick={onRemove}
      >
        <i styleName="icon-delete-pic" />{status === 'uploading' ? 'Cancel' : 'Delete Picture'}
      </a>
    </li>
  );
};

UploadPicture.propTypes = {
  picture: PropTypes.object.isRequired,
  removePicture: PropTypes.func.isRequired,
};

export default CSSModules(UploadPicture, styles, {allowMultiple: true});
