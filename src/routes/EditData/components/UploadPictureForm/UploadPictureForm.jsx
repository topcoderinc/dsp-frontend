import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Button from 'components/Button';
import accepts from 'attr-accept';
import _ from 'lodash';
import styles from './UploadPictureForm.scss';

// see https://css-tricks.com/drag-and-drop-file-uploading/#article-header-id-2
const preventEvents = 'drag dragstart dragend dragover dragenter dragleave drop';
const dragEnterEvents = 'dragover dragenter';
const dragLeaveEvents = 'dragleave dragend drop';
const dropEvents = 'drop';

// add/remove multiple events for the same handler
const addHandlers = (name, fn) => name.split(' ').forEach((eventName) => document.body.addEventListener(eventName, fn));
const removeHandlers = (name, fn) => name.split(' ').forEach((eventName) => document.body.removeEventListener(eventName, fn));

/*
* UploadPictureForm
*/

class UploadPictureForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      imagePreviewUrl: '',
      isDragOver: false,
      inputKey: 1, // after submit it will reset inputs
    };

    // some events must be prevented, otherwise drag&drop will not work
    this.preventEvent = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // show placeholder when dragging a file or files
    this.onDragEnter = () => {
      this.setState({isDragOver: true});
    };

    this.onDragLeave = () => {
      this.setState({isDragOver: false});
    };

    this.onDrop = (e) => {
      const droppedFiles = _.filter(e.dataTransfer.files, (file) => accepts(file, 'image/*'));
      droppedFiles.forEach(props.uploadPicture);
    };
  }

  componentDidMount() {
    addHandlers(preventEvents, this.preventEvent);
    addHandlers(dragEnterEvents, this.onDragEnter);
    addHandlers(dragLeaveEvents, this.onDragLeave);
    addHandlers(dropEvents, this.onDrop);
  }

  componentWillUnmount() {
    removeHandlers(preventEvents, this.preventEvent);
    removeHandlers(dragEnterEvents, this.onDragEnter);
    removeHandlers(dragLeaveEvents, this.onDragLeave);
    removeHandlers(dropEvents, this.onDrop);
  }

  handleSubmit(e) {
    e.preventDefault();
    const {files} = this.state;
    if (!files.length) {
      return;
    }
    _.forEach(files, this.props.uploadPicture);
    this.setState({
      files: [],
      inputKey: new Date().getTime(),
    });
  }

  handleImageChange(e) {
    e.preventDefault();
    this.setState({files: e.target.files});
  }

  render() {
    const {files, isDragOver, inputKey} = this.state;

    return (
      <div styleName="upload-picture">
        {isDragOver && <div styleName="drop-placeholder">
          <div styleName="inner">
            Drop files here
          </div>
        </div>}
        <form onSubmit={(e) => this.handleSubmit(e)} styleName="row">
          <label htmlFor="upload">Upload Picture</label>
          <div styleName="upload-input">
            <input
              key={inputKey}
              multiple
              styleName="file-input"
              id="fileInput"
              type="file"
              onChange={(e) => this.handleImageChange(e)}
            />
            <label htmlFor="fileInput">{_.map(files, 'name').join(', ')}</label>
          </div>
          <div styleName="upload-btns">
            <Button color="blue" className={styles.btnMargin} onClick={(e) => this.handleSubmit(e)}>Upload</Button>
            <input
              key={inputKey}
              multiple
              styleName="file-input"
              id="fileInput2"
              type="file"
              onChange={(e) => this.handleImageChange(e)}
            />
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
