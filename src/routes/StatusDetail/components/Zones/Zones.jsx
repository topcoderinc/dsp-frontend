import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {Row, Col} from 'react-flexbox-grid/lib/index';
import styles from './Zones.scss';

export const Zones = ({zones}) => (
  <div styleName="zones">
    {zones.length === 0 && <div styleName="no-zone"> No zones for now.</div>}
    {zones.map((zone, i) =>
      <div key={i} styleName="item">
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
            <span styleName="label">
              {zone.description}
            </span>
          </Col>
        </Row>
        {zone.location.type !== 'Point' && <Row>
          <Col sm={4}>
            <span styleName="label">
            Color:
          </span>
          </Col>
          <Col sm={8}>
            <span styleName="label color">
              {zone.style.fillColor}
            </span>
          </Col>
        </Row>}
      </div>
    )}
  </div>
);

Zones.propTypes = {
  zones: PropTypes.array.isRequired,
};

export default CSSModules(Zones, styles, {allowMultiple: true});
