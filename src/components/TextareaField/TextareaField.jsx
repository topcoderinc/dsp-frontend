import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import cn from 'classnames';
import styles from './TextareaField.scss';

export const TextareaField = ({size, ...props}) => (
  <div styleName={cn('textarea-field', `readonly-${props.readOnly}`)}>
    <textarea {..._.pick(props, 'type', 'value', 'onChange', 'id', 'readOnly')} styleName={cn(`size-${size}`)} />
  </div>
);

TextareaField.propTypes = {
  size: PropTypes.string,
  readOnly: PropTypes.bool,
};

TextareaField.defaultProps = {
  type: 'text',
  size: 'big',
  readOnly: false,
};

export default CSSModules(TextareaField, styles, {allowMultiple: true});
