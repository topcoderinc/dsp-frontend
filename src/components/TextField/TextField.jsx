import React from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './TextField.scss';

export const TextField = (props) => (
  <div styleName="text-field">
    <input {..._.pick(props, 'type', 'value', 'onChange')} />
  </div>
);

TextField.defaultProps = {
  type: 'text',
};

export default CSSModules(TextField, styles);
