import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import cn from 'classnames';
import styles from './FormField.scss';

export const FormField = ({ label, error, touched, children }) => (
  <div styleName={cn('form-field', { error: error && touched })}>
    <div styleName="label">{label || <span>&nbsp;</span>}</div>
    {children}
    {error && touched && <div styleName="error-message">{error}</div>}
  </div>
);

FormField.propTypes = {
  label: PropTypes.any,
  error: PropTypes.string,
  touched: PropTypes.bool,
  children: PropTypes.any.isRequired,
};

export default CSSModules(FormField, styles, { allowMultiple: true });
