import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import ReactDropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown';
import _ from 'lodash';
import styles from './SelectDropdown.scss';

export const SelectDropdown = ({options, value, onChange}) => {
  let dropdownRef;

  return (
    <div styleName="select-dropdown">
      <ReactDropdown
        ref={(dropdown) => {
          dropdownRef = dropdown;
        }}
      >
        <DropdownTrigger className={styles.trigger}>{(_.find(options, {value}) || options[0]).label}</DropdownTrigger>
        <DropdownContent className={styles.content}>
          <ul>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  dropdownRef.hide();
                  onChange(option.value);
                }}
                styleName={option.value === value ? 'active' : ''}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </DropdownContent>
      </ReactDropdown>
    </div>
  );
};

const optionTypeProps = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

SelectDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape(optionTypeProps)).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default CSSModules(SelectDropdown, styles);
