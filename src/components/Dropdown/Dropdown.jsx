import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import ReactDropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown';
import styles from './Dropdown.scss';

export const Dropdown = ({onRef, title, children}) => (
  <ReactDropdown ref={onRef}>
    <DropdownTrigger className={styles.trigger}>{title}</DropdownTrigger>
    <DropdownContent className={styles.content}>
      {children}
    </DropdownContent>
  </ReactDropdown>
);

Dropdown.propTypes = {
  onRef: PropTypes.func,
  title: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
};

export default CSSModules(Dropdown, styles);
