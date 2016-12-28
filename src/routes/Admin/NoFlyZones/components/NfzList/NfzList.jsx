import React, {PropTypes} from 'react';
import {Row, Col} from 'react-flexbox-grid/lib/index';
import CSSModules from 'react-css-modules';
import TextField from 'components/TextField';
import Select from 'components/Select';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import moment from 'moment';
import styles from './NfzList.scss';

const colors = [
  {label: 'Red', value: 'red'},
  {label: 'Yellow', value: 'yellow'},
  {label: 'Black', value: 'black'},
];

const formatDate = (date) => {
  if (!date) {
    return '';
  }
  return moment(date).format('YYYY-MM-DD');
};

const isValid = (zone) => {
  if (!zone.description.length) {
    return false;
  }
  if (!zone.isPermanent) {
    if (!zone.startTime || !zone.endTime || !moment(zone.startTime).isValid() || !moment(zone.endTime).isValid()) {
      return false;
    }
    if (moment(zone.startTime).isAfter(zone.endTime)) {
      return false;
    }
  }
  return true;
};

export const NfzList = ({zones, updateZone, saveNfz, deleteNfz}) => {
  const update = (zone, values) => updateZone({...zone, isEdited: true, ...values});
  return (
    <div styleName="nfz-list">
      <strong>
        Visible zones:
      </strong>

      {zones.map((zone) =>
        <div key={zone.id} styleName="item">
          <Row>
            <Col sm={4}>
              <span styleName="label">
                Description:
              </span>
            </Col>
            <Col sm={8}>
              <TextField
                value={zone.description}
                size="narrow"
                onChange={(e) => update(zone, {description: e.target.value})}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <span styleName="label">
                Color:
              </span>
            </Col>
            <Col sm={8}>
              <Select
                clearable={false}
                searchable={false}
                value={zone.style.fillColor}
                options={colors}
                onChange={(opt) => update(zone, {style: {fillColor: opt.value}})}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <span styleName="label">
                Is Active:
              </span>
            </Col>
            <Col sm={8}>
              <Checkbox
                id={`active_${zone.id}`}
                checked={!!zone.isActive}
                onChange={() => update(zone, {isActive: !zone.isActive})}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <span styleName="label">
                Is Permanent:
              </span>
            </Col>
            <Col sm={8}>
              <Checkbox
                id={`permanent_${zone.id}`}
                checked={!!zone.isPermanent}
                onChange={() => update(zone, {isPermanent: !zone.isPermanent})}
              />
            </Col>
          </Row>
          {!zone.isPermanent && <Row>
            <Col sm={4}>
              <span styleName="label">
                Start Time:
              </span>
            </Col>
            <Col sm={8}>
              <TextField
                value={formatDate(zone.startTime)}
                type="date"
                size="narrow"
                onChange={(e) => update(zone, {startTime: new Date(e.target.value)})}
              />
            </Col>
          </Row>}
          {!zone.isPermanent && <Row>
            <Col sm={4}>
              <span styleName="label">
                End Time:
              </span>
            </Col>
            <Col sm={8}>
              <TextField
                value={formatDate(zone.endTime)}
                type="date"
                size="narrow"
                onChange={(e) => update(zone, {endTime: new Date(e.target.value)})}
              />
            </Col>
          </Row>}
          <div styleName="actions">
            {!zone.isNew && <Button onClick={() => saveNfz(zone)} disabled={!zone.isEdited || !isValid(zone)} size="xs" color="blue">Update</Button>}
            {zone.isNew && <Button onClick={() => saveNfz(zone)} disabled={!isValid(zone)} size="xs" color="blue">Save</Button>}
            <Button onClick={() => deleteNfz(zone)} size="xs" color="gray">Delete</Button>
          </div>
        </div>
      )}
    </div>
  );
};

NfzList.propTypes = {
  zones: PropTypes.array.isRequired,
  updateZone: PropTypes.func.isRequired,
  saveNfz: PropTypes.func.isRequired,
  deleteNfz: PropTypes.func.isRequired,
};

export default CSSModules(NfzList, styles);
