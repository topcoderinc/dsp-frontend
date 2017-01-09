import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './PilotChecklistView.scss';
import PilotChecklistForm from '../containers/PilotChecklistFormContainer';

export const PilotChecklistView = () => (
  <div styleName="pilot-checklist-view">
    <div styleName="wrap">
      <div styleName="header">
        <h1 styleName="title">Flight Checklist</h1>
      </div>
      <div styleName="panel">
        <PilotChecklistForm />
      </div>
    </div>
  </div>
);

PilotChecklistView.propTypes = {
};

export default CSSModules(PilotChecklistView, styles);
