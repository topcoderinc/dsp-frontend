import React, { PropTypes, Component } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import { toastr } from 'react-redux-toastr';
import TextField from 'components/TextField';
import Button from 'components/Button';
import styles from './MissionPlannerHeader.scss';

export class MissionPlannerHeader extends Component {

  constructor(props) {
    super(props);

    this.validateMission = this.validateMission.bind(this);
  }

  validateMission() {
    let isMissionValid = true;

    if (this.props.mission.missionName.replace(' ', '') === '') {
      isMissionValid = false;

      toastr.warning('', 'Enter a mission name');
    }

    if (isMissionValid && !(this.props.mission.plannedHomePosition && this.props.mission.missionItems.length)) {
      isMissionValid = false;

      toastr.warning('', 'Add at least two waypoints before saving a mission');
    }

    if (isMissionValid) {
      if (this.props.mission.id) {
        toastr.success('', 'Mission updated', {
          timeOut: 1500,
        });
      } else {
        toastr.success('', 'Mission saved', {
          timeOut: 1500,
        });
      }
    }

    return isMissionValid;
  }

  render() {
    const { mission, save, clearMission, updateMissionName } = this.props;

    return (
      <div styleName="mission-planner-header">
        <div styleName="header-left">
          <h1 styleName="title">Mission Planner</h1>
          <form styleName="form">
            <label styleName="label">Name:</label>
            <div styleName="text-field">
              <TextField
                name="name"
                placeholder="Enter mission name"
                value={mission.missionName}
                onChange={(event) => { updateMissionName(event.target.value); }}
              />
            </div>
            <Button
              color="blue" onClick={() => {
                if (this.validateMission()) {
                  save();
                }
              }} size="medium"
            >{mission.id ? 'Update' : 'Save'}</Button>
          </form>
        </div>
        <div styleName="header-right">
          <Button color="gray" size="medium" onClick={clearMission}>Clear All</Button>
          <Link to="/mission-list" styleName="list-all">List All missions</Link>
        </div>
      </div>
    );
  }
}

MissionPlannerHeader.propTypes = {
  mission: PropTypes.object.isRequired,
  save: PropTypes.func.isRequired,
  clearMission: PropTypes.func.isRequired,
  updateMissionName: PropTypes.func.isRequired,
};


export default CSSModules(MissionPlannerHeader, styles);
