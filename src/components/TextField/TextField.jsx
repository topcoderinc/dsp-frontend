import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import cn from 'classnames';
import styles from './TextField.scss';

export const TextField = (props) => (
  <div styleName={props.size === 'narrow' ? 'text-field_narrow' : 'text-field'} className={cn({'login-input': props.login})}>
    <input {..._.pick(props, 'type', 'value', 'onChange')} type={props.type} placeholder={props.label} readOnly={props.readOnly} />
  </div>
);

TextField.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password']),
  size: PropTypes.oneOf(['normal', 'narrow']),
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  login: PropTypes.bool,
};

TextField.defaultProps = {
  type: 'text',
  size: 'normal',
  readOnly: false,
};

export default CSSModules(TextField, styles);
