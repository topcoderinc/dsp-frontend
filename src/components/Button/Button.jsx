import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import cn from 'classnames';
import styles from './Button.scss';

export const Button = ({children, color, size, ...rest}) => (
  <button {..._.omit(rest, 'styles')} styleName={cn('button', `color-${color}`, `size-${size}`)}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  size: 'normal',
};

export default CSSModules(Button, styles, { allowMultiple: true });
