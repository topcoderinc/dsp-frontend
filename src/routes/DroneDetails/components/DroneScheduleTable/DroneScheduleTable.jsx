import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Reactable from 'Reactable';
import styles from './DroneScheduleTable.scss';

const Table = Reactable.Table;

/*
* DroneScheduleTable
*/

export const DroneScheduleTable = ({scheduleTableData, selectedCalenderDate}) => (
  <div styleName="schedule-table">
    <div styleName="today">{selectedCalenderDate}</div>
    <Table id="DroneScheduleTable" data={scheduleTableData} />
  </div>
);

DroneScheduleTable.propTypes = {
  scheduleTableData: PropTypes.array.isRequired,
  selectedCalenderDate: PropTypes.string.isRequired,
};

export default CSSModules(DroneScheduleTable, styles);
