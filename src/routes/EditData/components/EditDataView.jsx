import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './EditDataView.scss';
import EditDataHeaderContainer from '../containers/EditDataHeaderContainer';
import TelemetryTabsContainer from '../containers/TelemetryTabsContainer';


/*
* EditDataView
*/

export const EditDataView = () => (
  <div>
    <EditDataHeaderContainer />

    <div styleName="edit-data-view">
      <div className="tabs-container">
        <TelemetryTabsContainer />
      </div>
    </div>
  </div>
);

EditDataView.propTypes = {

};

export default CSSModules(EditDataView, styles);
