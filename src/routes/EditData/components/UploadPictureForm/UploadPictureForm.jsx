import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Button from 'components/Button';
import styles from './UploadPictureForm.scss';

/*
* UploadPictureForm
*/

class UploadPictureForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '', imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    this.props.uploadPicture({imageSrc: this.state.imagePreviewUrl});
  }

  _handleImageChange(e) {
    e.preventDefault();

    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    const {file} = this.state;

    return (
      <div styleName="upload-picture">
        <form onSubmit={(e) => this._handleSubmit(e)} styleName="row">
          <label htmlFor="upload">Upload Picture</label>
          <div styleName="upload-input">
            <input styleName="file-input" id="fileInput" type="file" onChange={(e) => this._handleImageChange(e)} />
            <label htmlFor="fileInput">{file.name}</label>
          </div>
          <div styleName="upload-btns">
            <Button color="blue" className={styles.btnMargin} onClick={(e) => this._handleSubmit(e)}>Upload</Button>
            <input styleName="file-input" id="fileInput2" type="file" onChange={(e) => this._handleImageChange(e)} />
            <label styleName="browse-btn" htmlFor="fileInput2">Browse</label>
          </div>
        </form>
      </div>

    );
  }
}

UploadPictureForm.propTypes = {
  uploadPicture: PropTypes.func.isRequired,
};

export default CSSModules(UploadPictureForm, styles);
