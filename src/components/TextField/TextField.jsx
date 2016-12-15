import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './TextField.scss';

export const TextField = (props) => (
  <div styleName={props.size === 'narrow' ? 'text-field_narrow' : 'text-field'}>
    <input {..._.pick(props, 'value', 'onChange')} type={props.type} readOnly={props.readOnly} />
  </div>
);

TextField.propTypes = {
  type: PropTypes.oneOf(['text']),
  size: PropTypes.oneOf(['normal', 'narrow']),
  readOnly: PropTypes.bool,
};

TextField.defaultProps = {
  type: 'text',
  size: 'normal',
  readOnly: false,
};

export default CSSModules(TextField, styles);
