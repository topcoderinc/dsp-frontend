import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './PictureFromMission.scss';
import UploadPictureForm from '../UploadPictureForm';
import UploadedPicturesContainer from '../../containers/UploadedPicturesContainer';


/*
* PictureFromMission
*/

export const PictureFromMission = ({uploadPicture}) => (
  <div styleName="">
    <UploadPictureForm uploadPicture={uploadPicture} />
    <UploadedPicturesContainer />
  </div>
);

PictureFromMission.propTypes = {
  uploadPicture: PropTypes.func.isRequired,
};

export default CSSModules(PictureFromMission, styles);
