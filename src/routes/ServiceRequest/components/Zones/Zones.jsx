import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {Row, Col} from 'react-flexbox-grid/lib/index';
import TextField from 'components/TextField';
import Select from 'components/Select';
import Button from 'components/Button';
import Accordion from 'components/Accordion';
import styles from './Zones.scss';

const colors = [
  {label: 'Green', value: 'green'},
  {label: 'Blue', value: 'blue'},
  {label: 'Pink', value: 'pink'},
];


export const Zones = ({zones, updateZone, deleteZone}) => (
  <div styleName="zones">
    <Accordion title="Zones" defaultIsExpanded>
      {zones.length === 0 && <div> No zones selected. Please draw zones on the map. </div>}
      {zones.map((zone) =>
        <div key={zone.id} styleName="item">
          <Row>
            <Col sm={4}>
              <span styleName="label">
              Type:
            </span>
            </Col>
            <Col sm={8}>
              <span styleName="label">
                {zone.location.type}
              </span>
            </Col>
          </Row>
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
                onChange={(e) => updateZone({...zone, description: e.target.value})}
              />
            </Col>
          </Row>
          {zone.location.type !== 'Point' && <Row>
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
                onChange={(opt) => updateZone({...zone, style: {fillColor: opt.value}})}
              />
            </Col>
          </Row>}
          <div styleName="actions">
            <Row>
              <Col sm={8} smOffset={4}>
                <Button onClick={() => deleteZone(zone)} size="xs" color="gray">Delete</Button>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </Accordion>
  </div>
);

Zones.propTypes = {
  zones: PropTypes.array.isRequired,
  updateZone: PropTypes.func.isRequired,
  deleteZone: PropTypes.func.isRequired,
};

export default CSSModules(Zones, styles);
