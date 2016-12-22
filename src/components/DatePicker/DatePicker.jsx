import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {DateField, TransitionView, Calendar} from 'react-date-picker';
import styles from './DatePicker.scss';

export const DatePicker = ({onChange, value}) => (
  <div styleName="date-picker">
    <DateField
      dateFormat="YYYY-MM-DD hh:mm:ss A"
      onChange={onChange}
      value={value}
    >
      <TransitionView>
        <Calendar style={{padding: 10}} />
      </TransitionView>
    </DateField>
  </div>
);

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default CSSModules(DatePicker, styles);
