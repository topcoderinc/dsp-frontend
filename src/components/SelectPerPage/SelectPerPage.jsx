import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import ReactSelect from 'react-select';
import styles from './SelectPerPage.scss';

const options = [
  {value: 10, label: '10'},
  {value: 25, label: '25'},
  {value: 50, label: '50'},
  {value: 100, label: '100'},
];

export const SelectPerPage = ({value, onChange}) => (
  <div styleName="select-per-page">
    <span styleName="text-before">Show</span>
    <ReactSelect
      clearable={false}
      searchable={false}
      options={options}
      value={value}
      onChange={onChange}
    />
    <span styleName="text-after">per page</span>
  </div>
);

SelectPerPage.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CSSModules(SelectPerPage, styles);
