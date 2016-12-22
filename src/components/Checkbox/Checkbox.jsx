import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './Checkbox.scss';

const Checkbox = ({children, className, id, ...props}) => (
  <div styleName="checkbox" className={className}>
    <input id={id} type="checkbox" {..._.pick(props, 'checked', 'onChange', 'defaultChecked')} />
    <label htmlFor={id}>
      <span /> {children}
    </label>
  </div>
);

Checkbox.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default CSSModules(Checkbox, styles);
