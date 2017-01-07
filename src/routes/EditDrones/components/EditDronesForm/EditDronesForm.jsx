import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import {reduxForm} from 'redux-form';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import TextField from 'components/TextField';
import FileField from 'components/FileField';
import FormField from 'components/FormField';
import TextareaField from 'components/TextareaField';
import Select from 'components/Select';
import styles from './EditDronesForm.scss';

const DroneType = [
  {value: 'type1', label: 'type1'},
  {value: 'type2', label: 'type2'},
];

/*
* EditDronesForm
*/

export const EditDronesForm = ({fields, handleSubmit, cancel}) => (
  <div styleName="edit-drones-form">
    <form onSubmit={handleSubmit}>
      <div styleName="row">
        <label htmlFor="serialNumber">Drone serial number:</label>
        <FormField {...fields.serialNumber} className="editField">
          <TextField {...fields.serialNumber} />
        </FormField>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="droneName">Drone name:</label>
        <FormField {...fields.droneName} className="editField">
          <TextField {...fields.droneName} />
        </FormField>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="type">Drone type:</label>
        <FormField {...fields.type} className="editField">
          <Select
            clearable={false}
            options={DroneType}
            {..._.pick(fields.type, 'value', 'onChange')}
          />
        </FormField>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="speed">Speed:</label>
        <div styleName="minMaxSpeed">
          <div styleName="speed"><TextField {...fields.minSpeed} /> <div styleName="unit">mph</div><span styleName="hyphen">-</span></div>
          <div styleName="speed"><TextField {...fields.maxSpeed} /> <div styleName="unit">mph</div></div>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="maxFlight">Max. flight time:</label>
        <div styleName="input-with-label">
          <div styleName="input"><TextField {...fields.maxFlightTime} /></div>
          <div styleName="unit">minutes</div>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="maxCargo">Max. cargo weight:</label>
        <div styleName="input-with-label">
          <div styleName="input"><TextField {...fields.maxCargoWeight} /></div>
          <div styleName="unit">lbs</div>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="maxAltit">Max. altitude:</label>
        <div styleName="input-with-label">
          <div styleName="input"><TextField {...fields.maxAltitude} /></div>
          <div styleName="unit">miles</div>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="cameraResolution">Camera resolution:</label>
        <div styleName="input-with-label">
          <div styleName="input"><TextField {...fields.cameraResolution} /></div>
          <div styleName="unit">megapixels</div>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="videoResolution">Video resolution:</label>
        <div styleName="input-with-label">
          <div styleName="input"><TextField {...fields.videoResolution} /></div>
          <div styleName="unit">p</div>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="connectivity">Connectivity:</label>
        <div styleName="checkbox-options">
          <div styleName="checkbox">
            <Checkbox
              checked={fields.hasWiFi.value === true}
              onChange={() => fields.hasWiFi.onChange(!fields.hasWiFi.value)}
              id="hasWiFi"
            >Wi-fi</Checkbox>
          </div>
          <div styleName="checkbox">
            <Checkbox
              checked={fields.hasBluetooth.value === true}
              onChange={() => fields.hasBluetooth.onChange(!fields.hasBluetooth.value)}
              id="hasBluetooth"
            >Bluetooth</Checkbox>
          </div>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="engineType">Engine type:</label>
        <TextField {...fields.engineType} />
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="numberOfRotors">Number of rotors:</label>
        <TextField {...fields.numberOfRotors} />
      </div>
      {/* row end */}
      <div styleName="row" className={styles.checkboxRow}>
        <label htmlFor="sensors">Sensors</label>
        <div styleName="checkbox-options" >
          <div styleName="checkbox">
            <Checkbox
              checked={fields.hasAccelerometer.value === true}
              onChange={() => fields.hasAccelerometer.onChange(!fields.hasAccelerometer.value)}
              id="hasAccelerometer"
            >Accelerometer</Checkbox>
          </div>
          <div styleName="checkbox">
            <Checkbox
              checked={fields.hasGyroscope.value === true}
              onChange={() => fields.hasGyroscope.onChange(!fields.hasGyroscope.value)}
              id="hasGyroscope"
            >Gyroscope</Checkbox>
          </div>
          <div styleName="checkbox">
            <Checkbox
              checked={fields.hasRadar.value === true}
              onChange={() => fields.hasRadar.onChange(!fields.hasRadar.value)}
              id="hasRadar"
            >Radar</Checkbox>
          </div>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="sensors2" />
        <div styleName="checkbox-options">
          <div styleName="checkbox">
            <Checkbox
              checked={fields.hasGPS.value === true}
              onChange={() => fields.hasGPS.onChange(!fields.hasGPS.value)}
              id="hasGPS"
            >GPS</Checkbox>
          </div>
          <div styleName="checkbox">
            <Checkbox
              checked={fields.hasObstacleSensors.value === true}
              onChange={() => fields.hasObstacleSensors.onChange(!fields.hasObstacleSensors.value)}
              id="hasObstacleSensors"
            >Obstacle sensors</Checkbox>
          </div>
          <div styleName="checkbox">
            <Checkbox
              checked={fields.hasUltraSonicAltimeter.value === true}
              onChange={() => fields.hasUltraSonicAltimeter.onChange(!fields.hasUltraSonicAltimeter.value)}
              id="hasUltraSonicAltimeter"
            >Ultrasonic Altimeter</Checkbox>
          </div>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="description" styleName="desc-label">Drone description:</label>
        <TextareaField {...fields.description} />
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="engineType">Drone image:</label>
        <FileField {...fields.imageUrl} accept="image/*" />
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="droneSerial">Mileage:</label>
        <FormField {...fields.mileage} className="editField">
          <TextField {...fields.mileage} />
        </FormField>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="specificationContent" styleName="desc-label">Specification content:</label>
        <TextareaField {...fields.specificationContent} />
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="engineType">Specification image:</label>
        <FileField {...fields.specificationImageUrl} accept="image/*" />
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="engineType">Specification pdf:</label>
        <FileField {...fields.specificationPDFUrl} accept=".pdf" />
      </div>
      {/* row end */}
      <div styleName="actions">
        <Button color="gray" onClick={cancel} className={styles.btnMargin}>Cancel</Button>
        <Button type="submit" color="blue">Save</Button>
      </div>
      {/* actions end */}
    </form>
  </div>
);

EditDronesForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

const fields = [
  'serialNumber',
  'droneName',
  'type',
  'minSpeed',
  'maxSpeed',
  'maxFlightTime',
  'maxCargoWeight',
  'maxAltitude',
  'cameraResolution',
  'videoResolution',
  'hasWiFi',
  'hasBluetooth',
  'engineType',
  'numberOfRotors',
  'hasAccelerometer',
  'hasGyroscope',
  'hasRadar',
  'hasGPS',
  'hasObstacleSensors',
  'hasUltraSonicAltimeter',
  'description',
  'imageUrl',
  'mileage',
  'specificationContent',
  'specificationImageUrl',
  'specificationPDFUrl',
];

const validate = (values) => {
  const errors = {};

  if (!values.serialNumber) {
    errors.serialNumber = 'required';
  }

  if (!values.droneName) {
    errors.droneName = 'required';
  }

  if (!values.type) {
    errors.type = 'required';
  }

  return errors;
};

export default reduxForm({form: 'editDrones', fields, validate})(CSSModules(EditDronesForm, styles));
