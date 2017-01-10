import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {Link} from 'react-router';
import Table from 'components/Table';
import styles from './MissionListView.scss';

export const MissionListView = ({missions, offset, limit, total, load, deleteMission}) => {
  const columns = [{
    header: 'Mission Name',
    accessor: 'missionName',
  }, {
    id: 'edit',
    header: '',
    render: (prop) => <Link to={`/mission-planner/${prop.row.id}`}>Edit</Link>, // eslint-disable-line react/display-name
  }, {
    id: 'download',
    header: '',
    render: (prop) => <a href={prop.row.downloadLink} target="_blank" rel="noopener noreferrer">Download</a>, // eslint-disable-line react/display-name
  }, {
    id: 'delete',
    header: '',
    render: (prop) => (  // eslint-disable-line react/display-name
      <a
        href="#"
        onClick={(event) => {
          event.preventDefault();
          deleteMission(prop.row.id);
        }}
      >
        Delete
      </a>
    ),
  }];

  return (
    <div styleName="mission-list-view">
      <div styleName="wrap">
        <div styleName="header">
          <h1 styleName="title">Mission List</h1>
          <Link to="/mission-planner" styleName="create-btn">Create New Mission</Link>
        </div>
        <div styleName="panel">
          {missions.length ? (
            <Table
              columns={columns}
              data={missions}
              offset={offset}
              limit={limit}
              total={total}
              onChange={load}
            />
          ) : (
            <div>No missions found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

MissionListView.propTypes = {
  missions: PropTypes.array.isRequired,
  load: PropTypes.func.isRequired,
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  deleteMission: PropTypes.func.isRequired,
};

export default CSSModules(MissionListView, styles);
