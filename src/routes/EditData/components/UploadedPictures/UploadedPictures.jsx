import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Button from 'components/Button';
import styles from './UploadedPictures.scss';
import UploadPicture from '../UploadPicture';


/*
* UploadedPictures
*/

export const UploadedPictures = ({uploadedPictures, removePicture}) => (
  <div>
    <div styleName="uploaded-pictures">
      <h5>Uploaded Pictures</h5>
      <ul>
        {uploadedPictures.map((uploadedPicture, index) =>
          <UploadPicture key={index} imageSrc={uploadedPicture.imageSrc} removePicture={removePicture} index={index} />)}
      </ul>
    </div>

    {/* uploaded-pictures end */}
    <div styleName="actions">
      <Button color="black" className={styles.btnMargin}>Cancel</Button>
      <Button type="submit" color="blue">Save</Button>
    </div>
    {/* actions end */}
  </div>

);

UploadedPictures.propTypes = {
  uploadedPictures: PropTypes.array.isRequired,
  removePicture: PropTypes.func.isRequired,
};

export default CSSModules(UploadedPictures, styles);
