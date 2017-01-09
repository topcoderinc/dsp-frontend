import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './Radiobox.scss';

const Radiobox = ({children, className, radioValue, name, value, onChange, disabled}) => (
  <div styleName="radiobox" className={className}>
    <input
      type="radio"
      id={`${name}.${radioValue}`}
      name={name}
      value={radioValue}
      checked={value === radioValue}
      onChange={onChange}
      disabled={disabled}
    />
    <label htmlFor={`${name}.${radioValue}`}>
      <span /> {children}
    </label>
  </div>
);

Radiobox.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  radioValue: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

Radiobox.defaultProps = {
  disabled: false,
};

export default CSSModules(Radiobox, styles);
