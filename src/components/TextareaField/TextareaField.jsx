import React from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './TextareaField.scss';

export const TextareaField = (props) => (
  <div styleName="text-field">
    <textarea {..._.pick(props, 'type', 'value', 'onChange')} />
  </div>
);

TextareaField.defaultProps = {
  type: 'text',
};

export default CSSModules(TextareaField, styles);
