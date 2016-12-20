import React from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import cn from 'classnames';
import styles from './TextField.scss';

export const TextField = (props) => (
  <div styleName="text-field" className={cn({'login-input': props.login})}>
    <input {..._.pick(props, 'type', 'value', 'onChange')} placeholder={props.label} />
  </div>
);

TextField.defaultProps = {
  type: 'text',
};

export default CSSModules(TextField, styles);
