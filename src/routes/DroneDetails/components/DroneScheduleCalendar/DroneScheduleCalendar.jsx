import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import moment from 'moment';
import Calendar from 'rc-calendar';
import styles from './DroneScheduleCalendar.scss';

/*
* DroneScheduleCalendar
*/

const now = moment();
const defaultCalendarValue = now;
const format = 'dddd, MMMM DD, YYYY';

class DroneScheduleCalendar extends React.Component {
  onStandaloneSelect(value) {
    this.props.selectedDateHandle(value.format(format));
  }

  render() {
    return (
      <div styleName="shedule-calendar">
        <Calendar
          showDateInput={false} showToday={false} onSelect={::this.onStandaloneSelect} defaultValue={defaultCalendarValue}
        />
      </div>
    );
  }
}

DroneScheduleCalendar.propTypes = {
  selectedDateHandle: PropTypes.func.isRequired,
};

export default CSSModules(DroneScheduleCalendar, styles);
