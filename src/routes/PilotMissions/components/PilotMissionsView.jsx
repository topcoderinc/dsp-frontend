import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {Link} from 'react-router';
import StatusLabel from 'components/StatusLabel';
import Table from 'components/Table';
import styles from './PilotMissionsView.scss';

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
}];

export const PilotMissionsView = ({missions, load, offset, limit, total, sortBy}) => (
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

PilotMissionsView.propTypes = {
  missions: PropTypes.array.isRequired,
  load: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
};

export default CSSModules(PilotMissionsView, styles);
