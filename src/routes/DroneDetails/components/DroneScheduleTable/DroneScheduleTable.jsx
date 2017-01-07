import React, {PropTypes} from 'react';
import dateFormat from 'dateformat';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './DroneScheduleTable.scss';

/**
 * Format a number
 * @param  {Mixed}  value number to format
 * @return {String}       formatted value
 */
const formatNumber = (value) => (
  _.isNumber(value) ? value.toFixed(2) : value
);

/*
* DroneScheduleTable
*/

export const DroneScheduleTable = ({scheduleDay, scheduleDayMissions, drone}) => (
  <div styleName="schedule-table">
    {scheduleDay &&
      <div styleName="content" >
        <div styleName="today">{scheduleDay.format('dddd, MMMM DD, YYYY')}</div>
        <div styleName="react-table">
          <table styleName="table">
            <thead styleName="thead">
              <tr styleName="tr">
                <th><div styleName="th-inner">Scheduled Launch Time</div></th>
                <th><div styleName="th-inner">Drone Serial Number</div></th>
                <th><div styleName="th-inner">Service Type</div></th>
                <th><div styleName="th-inner">Pick-up Location</div></th>
                <th><div styleName="th-inner">Drop-off Location</div></th>
                <th><div styleName="th-inner">What to deliver / Weight</div></th>
              </tr>
            </thead>
            <tbody>
              {scheduleDayMissions.map((scheduleDayMission) => (
                <tr styleName="tr" key={scheduleDayMission.id}>
                  <td><div styleName="td-inner">{dateFormat(scheduleDayMission.scheduledAt, 'HH:MM TT')}</div></td>
                  <td><div styleName="td-inner">{drone.serialNumber}</div></td>
                  <td><div styleName="td-inner">{scheduleDayMission.serviceType}</div></td>
                  <td>
                    <div styleName="td-inner">
                      <div>{scheduleDayMission.startingPoint.line1}</div>
                      <div>{scheduleDayMission.startingPoint.city}, {scheduleDayMission.startingPoint.state}, {scheduleDayMission.startingPoint.postalCode}</div>
                    </div>
                  </td>
                  <td>
                    <div styleName="td-inner">
                      <div>{scheduleDayMission.destinationPoint.line1}</div>
                      <div>{scheduleDayMission.destinationPoint.city}, {scheduleDayMission.destinationPoint.state}, {scheduleDayMission.destinationPoint.postalCode}</div>
                    </div>
                  </td>
                  <td><div styleName="td-inner">{scheduleDayMission.whatToBeDelivered} / {formatNumber(scheduleDayMission.weight)} lbs</div></td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    }
  </div>
);

DroneScheduleTable.propTypes = {
  scheduleDay: PropTypes.object,
  scheduleDayMissions: PropTypes.array.isRequired,
  drone: PropTypes.object.isRequired,
};

export default CSSModules(DroneScheduleTable, styles);
