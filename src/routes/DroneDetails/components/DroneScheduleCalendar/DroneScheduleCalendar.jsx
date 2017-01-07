import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import Calendar from 'rc-calendar/lib/FullCalendar';
import styles from './DroneScheduleCalendar.scss';

// Calendar requires a Select property, so we give him a plug
const PlugSelect = () => <span />;
PlugSelect.Option = () => <span />; // eslint-disable-line react/display-name

/**
 * Check if there any missions on a date, if no we disable such date
 * @param  {Object} value                 date to check missions
 * @param  {Array}  scheduleMonthMissions array of missions for a month
 * @return {Boolean}                      if no missions - returs true
 */
const isDateDisabled = (value, scheduleMonthMissions) => !_.find(scheduleMonthMissions, {date: value.format('YYYY-MM-DD')});

/*
  Component to render calendar header
 */
const CalendarHeader = ({value, onMonthChange}) => (
  <div className="rc-calendar-header" key="calendarHeader">
    <span className="rc-calendar-prev-month-btn" onClick={() => onMonthChange(value.add(-1, 'months'))} />
    <span className="rc-calendar-my-select"><span className="rc-calendar-month-select">{value.format('MMMM YYYY')}</span></span>
    <span className="rc-calendar-next-month-btn" onClick={() => onMonthChange(value.add(+1, 'months'))} />
  </div>
);

CalendarHeader.propTypes = {
  value: PropTypes.object.isRequired,
  onMonthChange: PropTypes.func.isRequired,
};

/*
  Component to render calendar cell
 */
const CalendarDateCellContent = ({value, scheduleMonthMissions, scheduleDay}) => {
  const dayMissionCount = _.find(scheduleMonthMissions, {date: value.format('YYYY-MM-DD')});

  return (
    dayMissionCount ? (
      <span className={`rc-calendar-date-missions${value.diff(scheduleDay, 'days') === 0 ? ' rc-calendar-date-missions-selected' : ''}`}>
        {value.format('D')}
        <span className="rc-calendar-date-missions-qty">{dayMissionCount.count} mission{dayMissionCount.count > 1 ? 's' : ''}</span>
      </span>
    ) : (
      <span>{value.format('D')}</span>
    )
  );
};

CalendarDateCellContent.propTypes = {
  value: PropTypes.object.isRequired,
  scheduleMonthMissions: PropTypes.array.isRequired,
  scheduleDay: PropTypes.object.isRequired,
};

/*
* DroneScheduleCalendar
*/

const DroneScheduleCalendar = ({scheduleMonth, changeMonth, scheduleMonthMissions, scheduleDay, selectScheduleDay}) => (
  <div styleName="shedule-calendar">
    <Calendar
      onSelect={selectScheduleDay}
      value={scheduleMonth}
      disabledDate={(value) => isDateDisabled(value, scheduleMonthMissions)}
      headerRender={(value) => CalendarHeader({value, onMonthChange: changeMonth})}
      dateCellContentRender={(value) => CalendarDateCellContent({value, scheduleMonthMissions, scheduleDay})}
      Select={PlugSelect}
    />
  </div>
);

DroneScheduleCalendar.propTypes = {
  scheduleMonth: PropTypes.object.isRequired,
  changeMonth: PropTypes.func.isRequired,
  scheduleMonthMissions: PropTypes.array.isRequired,
  scheduleDay: PropTypes.object,
  selectScheduleDay: PropTypes.func.isRequired,
};

export default CSSModules(DroneScheduleCalendar, styles);
