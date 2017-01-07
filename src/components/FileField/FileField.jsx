import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './FileField.scss';

/**
 * Gets filename to display, no metter what was supplied: string, FileList object or an Object with numeral keys
 * @param  {Mixed}  value source to get filename
 * @return {String}       filename to display
 */
const getFileName = (value) => {
  let newValue = value;

  if (_.isUndefined(newValue)) {
    newValue = '';
  } else if (value[0] && _.isString(value[0].name)) {
    newValue = value[0].name;
  }

  return newValue;
};

export const FileField = (props) => (
  <div styleName={props.size === 'narrow' ? 'file-field_narrow' : 'file-field'}>
    <div styleName="text"><input type="text" readOnly placeholder={props.label} value={getFileName(props.value || props.initialValue)} /></div>
    <label styleName="button"><input
      type="file" onChange={(event) => {
        props.onChange(event);
      }} accept={props.accept}
    />Browse</label>
  </div>
);

FileField.propTypes = {
  size: PropTypes.oneOf(['normal', 'narrow']),
  label: PropTypes.string,
  accept: PropTypes.string,
  value: PropTypes.any,
  initialValue: PropTypes.any,
  onChange: PropTypes.func,
};

FileField.defaultProps = {
  size: 'normal',
};

export default CSSModules(FileField, styles);
