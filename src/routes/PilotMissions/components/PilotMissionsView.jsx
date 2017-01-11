import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {Link} from 'react-router';
import StatusLabel from 'components/StatusLabel';
import Table from 'components/Table';
import styles from './PilotMissionsView.scss';
import Button from 'components/Button';
import _ from 'lodash';
import CheckStatus from './CheckStatus';
import APIService from 'services/APIService';
import {toastr} from 'react-redux-toastr';

const DEFAULT_ERROR_MESSAGE = 'something went wrong, try again later';

class PilotMissionsView extends React.Component {

  /**
   * Validate that the questions checklist is completed by the pilot
   * @param  {Object}     mission     the mission for which to validate the checklist
   * @return {Boolean}                true if checklist is completed otherwise false
   */
  validatePilotChecklist(mission) {
    const has = _.has(mission, 'pilotChecklist') && _.has(mission, 'pilotChecklist.answers');
    if (has === false) {
      return has;
    }
    let valid = true;
    for (let i = 0; i < mission.pilotChecklist.answers.length; i += 1) {
      const single = mission.pilotChecklist.answers[i];
      if (single.answer === 'no' || (single.answer === 'note' && !_.has(single, 'answer.note'))) {
        valid = false;
      }
    }
    return valid;
  }

  /**
   * Check status for a mission drone's
   *
   * @param  {Object}     event       the mouse click event
   * @param  {String}     missionId   the mission id for which to check the drone status
   */
  checkStatus(event, missionId) {
    event.preventDefault();
    const {droneCheckStatusHandler} = this.props;
    droneCheckStatusHandler(missionId);
  }

  /**
   * Send the mission to the drone
   *
   * @param  {Object}     event       the mouse click event
   * @param  {String}     missionId   the drone's mission id for which to send the mission
   */
  sendToDrone(event, missionId) {
    event.preventDefault();
    APIService.loadMission(missionId).then(() => {
      toastr.success('', 'Mission sent to drone');
    }).catch((reason) => {
      const message = _.has(reason, 'respose.text') ? JSON.parse(reason.respose.text).error :
        DEFAULT_ERROR_MESSAGE;
      toastr.error('', message);
    });
  }

  /**
   * Close the check status modal popup
   */
  closeModal(missionId) {
    const {droneCheckStatusHandler} = this.props;
    droneCheckStatusHandler(missionId);
  }

  /**
   * React Component lifecycle render method
   */
  render() {
    const _self = this;
    // only one drone status modal can be opened at a time
    const {missions, load, offset, limit, total, sortBy, statusModalOpen, droneStatus} = this.props;
    const columns = [{
      header: 'Mission Name',
      accessor: 'missionName',
      render: (prop) => <Link to={`/pilot-checklist/${prop.row.id}`}>{prop.value}</Link>, // eslint-disable-line react/display-name
      sortable: true,
    }, {
      header: 'Status',
      accessor: 'status',
      render: (prop) => <StatusLabel value={prop.value} />, // eslint-disable-line react/display-name
      sortable: true,
    }, {
      header: 'Assigned Drone',
      accessor: 'drone.name',
      sortable: true,
    }, {
      header: 'Online',
      sortable: false,
      render: (prop) => <span className="online-status">{prop.row.droneOnline === true ? 'Y' : 'N'}</span>,
    }, {
      header: '',
      sortable: false,
      render: (prop) => {
        const disableSendToDrone = prop.row.status === 'completed' || prop.row.droneOnline === false ||
          !_self.validatePilotChecklist(prop.row);

        const disableCheckStatus = prop.row.status === 'completed' || prop.row.droneOnline === false;
        const dStatus = droneStatus[prop.row.id] || {};
        const isOpen = statusModalOpen[prop.row.id] || false;
        return (
          <div>
            {/* only add the modal to DOM if for this mission, modal has to be opened */}
            {isOpen && <CheckStatus modalOpen={isOpen} droneStatus={dStatus} closeModal={() => _self.closeModal(prop.row.id)} />}
            {disableSendToDrone === false && <Button className="send-drone" onClick={(event) => _self.sendToDrone(event, prop.row.id)} size="medium">Send to drone</Button>}
            {disableSendToDrone === true && <Button disabled className="send-drone" onClick={(event) => _self.sendToDrone(event, prop.row.id)} size="medium">Send to drone</Button>}
            {disableCheckStatus === false && <Button onClick={(event) => _self.checkStatus(event, prop.row.id)} size="medium">Check Status</Button>}
            {disableCheckStatus === true && <Button disabled onClick={(event) => _self.checkStatus(event, prop.row.id)} size="medium">Check Status</Button>}
          </div>
        );
      },
    }];
    return (
      <div styleName="pilot-missions-view">
        <div styleName="wrap">
          <div styleName="header">
            <h1 styleName="title">Pilot Missions</h1>
          </div>
          <div styleName="panel">
            {missions.length ? (
              <Table
                columns={columns}
                data={missions}
                offset={offset}
                limit={limit}
                total={total}
                sortBy={sortBy}
                onChange={load}
              />
            ) : (
              <div>No missions found.</div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

PilotMissionsView.propTypes = {
  missions: PropTypes.array.isRequired,
  load: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  droneCheckStatusHandler: PropTypes.func.isRequired,
  statusModalOpen: PropTypes.object.isRequired,
  droneStatus: PropTypes.object.isRequired,
};

export default CSSModules(PilotMissionsView, styles);
