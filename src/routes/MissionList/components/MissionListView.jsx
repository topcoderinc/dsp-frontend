import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import styles from './MissionListView.scss';

export const MissionListView = ({ missions, deleteMission }) => (
  <div styleName="mission-list-view">
    <div styleName="wrap">
      <div styleName="header">
        <h1 styleName="title">Mission List</h1>
        <Link to="/mission-planner" styleName="create-btn">Create New Mission</Link>
      </div>
      <div styleName="panel">
        {missions.length ? (
          <table styleName="my-request-table">
            <thead styleName="thead">
              <tr>
                <th styleName="th">Mission Name</th>
                <th styleName="th" />
                <th styleName="th" />
                <th styleName="th" />
              </tr>
            </thead>
            <tbody>
              {missions.map((mission) => (
                <tr styleName="tr" key={mission.id}>
                  <td styleName="td">{mission.missionName}</td>
                  <td styleName="td"><Link to={`/mission-planner/${mission.id}`}>Edit</Link></td>
                  <td styleName="td"><a href={mission.downloadLink} target="_blank" rel="noopener noreferrer">Download</a></td>
                  <td styleName="td"><a href="#" onClick={(event) => { event.preventDefault(); deleteMission(mission.id); }}>Delete</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span>No missions found.</span>
        )}
      </div>
    </div>
  </div>
);

MissionListView.propTypes = {
  missions: PropTypes.array.isRequired,
  deleteMission: PropTypes.func.isRequired,
};

export default CSSModules(MissionListView, styles);
