import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { reduxForm } from 'redux-form';
import Button from 'components/Button';
import styles from './TelemetryTabs.scss';
import TelemetryDataForm from '../TelemetryDataForm';
import PictureFromMission from '../PictureFromMission';

Tabs.setUseDefaultStyles(false);


/*
* TelemetryTabs
*/

export const TelemetryTabs = ({fields, handleSubmit, resetForm, uploadPicture}) => (
  <Tabs>

    <TabList>
      <Tab>Telemetry Data</Tab>
      <Tab>Picture from Mission</Tab>
    </TabList>

    <TabPanel>
      <div className="telemetry-form-container">
        <form onSubmit={handleSubmit}>
          <TelemetryDataForm fields={fields} />

          <div styleName="actions">
            <Button color="gray" onClick={resetForm} className={styles.btnMargin}>Cancel</Button>
            <Button type="submit" color="blue">Save</Button>
          </div>
        </form>
      </div>
    </TabPanel>

    <TabPanel>
      <PictureFromMission uploadPicture={uploadPicture} />
    </TabPanel>

  </Tabs>
);


TelemetryTabs.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  uploadPicture: PropTypes.func.isRequired,
};

const fields = ['date', 'hour', 'minute', 'distance',
  'avgSpeed', 'minSpeed', 'maxSpeed', 'launchDate', 'missionDate', 'launchHour', 'launchMinute'];

const validate = (values) => {
  const errors = {};

  if (!values.launchDate) {
    errors.launchDate = 'required';
  }
  if (!values.missionDate) {
    errors.missionDate = 'required';
  }

  if (!values.distance) {
    errors.distance = 'required';
  }
  if (!values.avgSpeed) {
    errors.avgSpeed = 'required';
  }
  if (!values.minSpeed) {
    errors.minSpeed = 'required';
  }
  if (!values.maxSpeed) {
    errors.maxSpeed = 'required';
  }
  return errors;
};

export default reduxForm({ form: 'editDataForm', fields, validate })(CSSModules(TelemetryTabs, styles));

