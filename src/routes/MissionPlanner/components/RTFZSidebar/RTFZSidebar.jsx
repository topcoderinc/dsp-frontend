import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './RTFZSidebar.scss';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import ToggleButton from 'react-toggle-button';

class RTFZSidebar extends React.Component {

  /**
   * Hide the rtfz
   * This will invoke the redux action
   *
   * @param {Object}    value         the boolean value
   * @param {Object}    rtfz          the rtfz to toggle
   */
  toggleRtfz(value, rtfz) {
    this.props.toggleRtfzHandler({value, rtfz});
  }

  render() {
    const {rtfzs} = this.props;
    return (
      <div styleName="rtfz-sidebar">
        {rtfzs && rtfzs.length > 0 ? (
            rtfzs.map((rtfz) => (
              <Grid key={rtfz._id} styleName="sidebar-item">
                <Row>
                  <Col xs={6} md={6}>{rtfz.description}</Col>
                  <Col xs={6} md={6}>
                    <div styleName="toggle-wrapper">
                      <ToggleButton
                        value={rtfz.show}
                        activeLabel="hide"
                        inactiveLabel="show"
                        onToggle={(value) => this.toggleRtfz(value, rtfz)}
                      />
                    </div>
                  </Col>
                </Row>
              </Grid>
            ))
          ) : (
            <div styleName="note">No region to flyzones defined</div>
          )}
      </div>
    );
  }
}

RTFZSidebar.propTypes = {
  rtfzs: PropTypes.array.isRequired,
  toggleRtfzHandler: PropTypes.func.isRequired,
};

export default CSSModules(RTFZSidebar, styles, {allowMultiple: true});
