import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import ReactDropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown';
import styles from './Dropdown.scss';

export const Dropdown = ({title, children}) => (
  <div styleName="dropdown">
    <ReactDropdown>
      <DropdownTrigger className={styles.trigger}>{title}</DropdownTrigger>
      <DropdownContent className={styles.content}>
        {children}
      </DropdownContent>
    </ReactDropdown>
  </div>
);

Dropdown.propTypes = {
  title: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
};

export default CSSModules(Dropdown, styles);
