import React, {Component, PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import TextField from 'components/TextField';
import styles from './InfoWindow.scss';
import Select from '../Select';

import commands from './data/commands.js';
import frames from './data/frames.js';

class InfoWindow extends Component {

  constructor(props) {
    super(props);
    this.getSelectedCommand = this.getSelectedCommand.bind(this);
    this.getSequence = this.getSequence.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.toggleFullBody = this.toggleFullBody.bind(this);
    this.deleteSelf = this.deleteSelf.bind(this);

    this.state = {
      fullBody: 'hidden',
    };
  }

  getSelectedCommand() {
    let commandText = `command: ${this.props.command} / type: ${this.getType()}  `;

    if (this.props.command === 22) {
      commandText = `Takeoff (${this.props.command} / ${this.getType()} ) `;
    } else if (this.props.command === 16) {
      commandText = `Waypoint (${this.props.command} / ${this.getType()} ) `;
    } else if (this.props.command === 21) {
      commandText = `Land (${this.props.command} / ${this.getType()} ) `;
    } else if (this.props.command === 203) {
      commandText = `Take a Picture (${this.props.command} / ${this.getType()} ) `;
    }

    return commandText;
  }

  getSequence() {
    let seqText = this.props.id;

    if (this.getType() !== 'W') {
      seqText = this.getType();
    }

    return seqText;
  }

  getType() {
    let typeText = 'W';

    if (this.props.id === 0) {
      typeText = 'H';
    } else if (this.props.id === 1) {
      typeText = 'T';
    }

    return typeText;
  }

  getCurrentMissionItem() {
    return {
      autoContinue: true,
      id: this.props.id,
      coordinate: [this.props.lat, this.props.lng, this.props.alt],
      param1: this.props.param1,
      param2: this.props.param2,
      param3: this.props.param3,
      param4: this.props.param4,
      command: this.props.command,
      frame: this.props.frame,
      type: 'missionItem',
    };
  }

  deleteSelf() {
    this.props.deleteWaypoint(this.props.id);
  }

  toggleFullBody() {
    const newState = this.state.fullBody === 'hidden' ? 'visible' : 'hidden';
    this.setState({fullBody: newState});
  }

  handleNumberChange(name, event) {
    const value = event.target.value;
    const missionItem = this.getCurrentMissionItem();

    if (value.match(/^-?\d*(\.\d*)?$/)) {
      const coord = ['lat', 'lng', 'alt'].indexOf(name);

      if (coord > -1) {
        missionItem.coordinate[coord] = value;
      } else {
        missionItem[name] = value;
      }

      this.props.onUpdate(this.props.id, missionItem);
    }
  }

  handleSelectChange(name, option) {
    const value = option.value;
    const missionItem = this.getCurrentMissionItem();

    missionItem[name] = value;

    this.props.onUpdate(this.props.id, missionItem);
  }

  render() {
    const isHome = this.getType() === 'H';

    return (
      <form>
        <Grid styleName="info-window-container">
          <Row>
            <Col sm={1}><span styleName={this.state.fullBody === 'hidden' ? 'toggle_down' : 'toggle_up'} onClick={this.toggleFullBody} /></Col>
            <Col sm={2}>{this.getSequence()}</Col>
            <Col sm={8} styleName="text-right">{this.getSelectedCommand()}</Col>
            <Col sm={1} styleName="text-right">{!isHome && <span styleName="delete" onClick={this.deleteSelf} />}</Col>
          </Row>
          <div styleName={this.state.fullBody}>
            { isHome === false &&
            <Row>
              <Col sm={12}>
                <p>Provides advanced access to all commands. Be very careful!</p>
              </Col>
            </Row>
          }
            { isHome === true ? (
              <div>
                <Row>
                  <Col sm={12}>
                    <p>Planned home position. Actual home position set by vehicle</p>
                  </Col>
                </Row>
                <Row styleName="row">
                  <Col sm={3}>
                    <span styleName="label">Lat/X:</span>
                  </Col>
                  <Col sm={9}>
                    <TextField value={this.props.lat} onChange={this.handleNumberChange.bind(this, 'lat')} size="narrow" />
                  </Col>
                </Row>
                <Row styleName="row">
                  <Col sm={3}>
                    <span styleName="label">Lon/Y:</span>
                  </Col>
                  <Col sm={9}>
                    <TextField value={this.props.lng} onChange={this.handleNumberChange.bind(this, 'lng')} size="narrow" />
                  </Col>
                </Row>
                <Row>
                  <Col sm={3}>
                    <span styleName="label">Alt/Z:</span>
                  </Col>
                  <Col sm={9}>
                    <TextField value={this.props.alt} onChange={this.handleNumberChange.bind(this, 'alt')} size="narrow" />
                  </Col>
                </Row>
              </div>
          ) : (
            <div>
              <Row styleName="row">
                <Col sm={12}>
                  <Select
                    clearable={false} searchable={false} name="command" value={this.props.command}
                    options={commands} onChange={this.handleSelectChange.bind(this, 'command')} disabled={this.props.id < 2}
                  />
                </Col>
              </Row>
              <Row styleName="row">
                <Col sm={12}>
                  <Select
                    clearable={false} searchable={false} name="frame" value={this.props.frame}
                    options={frames} onChange={this.handleSelectChange.bind(this, 'frame')}
                  />
                </Col>
              </Row>
              <Row styleName="row">
                <Col sm={3}>
                  <span styleName="label">Lat/X:</span>
                </Col>
                <Col sm={9}>
                  <TextField value={this.props.lat} onChange={this.handleNumberChange.bind(this, 'lat')} size="narrow" />
                </Col>
              </Row>
              <Row styleName="row">
                <Col sm={3}>
                  <span styleName="label">Lon/Y:</span>
                </Col>
                <Col sm={9}>
                  <TextField value={this.props.lng} onChange={this.handleNumberChange.bind(this, 'lng')} size="narrow" />
                </Col>
              </Row>
              <Row styleName="row">
                <Col sm={3}>
                  <span styleName="label">Param1:</span>
                </Col>
                <Col sm={9}>
                  <TextField value={this.props.param1} onChange={this.handleNumberChange.bind(this, 'param1')} size="narrow" />
                </Col>
              </Row>
              <Row styleName="row">
                <Col sm={3}>
                  <span styleName="label">Param2:</span>
                </Col>
                <Col sm={9}>
                  <TextField value={this.props.param2} onChange={this.handleNumberChange.bind(this, 'param2')} size="narrow" />
                </Col>
              </Row>
              <Row styleName="row">
                <Col sm={3}>
                  <span styleName="label">Param3:</span>
                </Col>
                <Col sm={9}>
                  <TextField value={this.props.param3} onChange={this.handleNumberChange.bind(this, 'param3')} size="narrow" />
                </Col>
              </Row>
              <Row styleName="row">
                <Col sm={3}>
                  <span styleName="label">Param4:</span>
                </Col>
                <Col sm={9}>
                  <TextField value={this.props.param4} onChange={this.handleNumberChange.bind(this, 'param4')} size="narrow" />
                </Col>
              </Row>
              <Row>
                <Col sm={3}>
                  <span styleName="label">Alt/Z:</span>
                </Col>
                <Col sm={9}>
                  <TextField value={this.props.alt} onChange={this.handleNumberChange.bind(this, 'alt')} size="narrow" />
                </Col>
              </Row>
            </div>
          )}
          </div>
        </Grid>
      </form>
    );
  }
}

InfoWindow.propTypes = {
  id: PropTypes.any,
  lat: PropTypes.any,
  lng: PropTypes.any,
  alt: PropTypes.any,
  param1: PropTypes.any,
  param2: PropTypes.any,
  param3: PropTypes.any,
  param4: PropTypes.any,
  command: PropTypes.any,
  frame: PropTypes.any,
  onUpdate: PropTypes.any,
  deleteWaypoint: PropTypes.any,
};

export default CSSModules(InfoWindow, styles);
