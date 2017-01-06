import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import SelectDropdown from 'components/SelectDropdown';
import styles from './MyRequestHeader.scss';

export const MyRequestHeader = ({onStatusChange, statusValue}) => (
  <div styleName="my-request-header">
    <h1 styleName="title">My Request Status</h1>
    <SelectDropdown
      options={[
        {value: 'all', label: 'Show all requests'},
        {value: 'in-progress', label: 'Show In Progress'},
        {value: 'cancelled', label: 'Show Cancelled'},
        {value: 'completed', label: 'Show Completed'},
        {value: 'rejected', label: 'Show Rejected'},
        {value: 'pending', label: 'Show Pending'},
        {value: 'scheduled', label: 'Show Scheduled'},
      ]}
      value={statusValue}
      onChange={onStatusChange}
    />
  </div>
);

MyRequestHeader.propTypes = {
  onStatusChange: PropTypes.func.isRequired,
  statusValue: PropTypes.string.isRequired,
};

export default CSSModules(MyRequestHeader, styles);
