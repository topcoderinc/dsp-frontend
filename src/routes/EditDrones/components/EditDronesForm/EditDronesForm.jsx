import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {reduxForm} from 'redux-form';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import TextField from 'components/TextField';
import FormField from 'components/FormField';
import TextareaField from 'components/TextareaField';
import styles from './EditDronesForm.scss';

/*
* EditDronesForm
*/

export const EditDronesForm = ({fields, handleSubmit, resetForm}) => (
  <div styleName="edit-drones-form">
    <form onSubmit={handleSubmit}>
      <div styleName="row">
        <label htmlFor="droneSerial">Drone serial number:</label>
        <FormField {...fields.serialNum} className="editField">
          <TextField {...fields.serialNum} />
        </FormField>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="droneName">Drone name:</label>
        <FormField {...fields.name} className="editField">
          <TextField {...fields.name} />
        </FormField>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="droneName">Drone type:</label>
        <FormField {...fields.type} className="editField">
          <TextField {...fields.type} />
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
        <label htmlFor="cameraReso">Camera resolution:</label>
        <div styleName="input-with-label">
          <div styleName="input"><TextField {...fields.cameraRes} /></div>
          <div styleName="unit">megapixels</div>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="videoReso2">Video resolution:</label>
        <div styleName="input-with-label">
          <div styleName="input"><TextField {...fields.videoRes} /></div>
          <div styleName="unit">p</div>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="videoReso1">Connectivity:</label>
        <div styleName="checkbox-options">
          <div styleName="checkbox">
            <Checkbox
              checked={fields.wifi.value !== true}
              onChange={() => fields.wifi.onChange(!fields.wifi.value)}
              id="wifi"
            >Wi-fi</Checkbox>
          </div>
          <div styleName="checkbox">
            <Checkbox
              checked={fields.bluetooth.value === true}
              onChange={() => fields.bluetooth.onChange(!fields.bluetooth.value)}
              id="bluetooth"
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
        <label htmlFor="numOfRotors">Number of rotors:</label>
        <TextField {...fields.numOfRotors} />
      </div>
      {/* row end */}
      <div styleName="row" className={styles.checkboxRow}>
        <label htmlFor="videoReso">Video resolution:</label>
        <div styleName="checkbox-options" >
          <div styleName="checkbox">
            <Checkbox
              checked={fields.accelerometer.value !== true}
              onChange={() => fields.accelerometer.onChange(!fields.accelerometer.value)}
              id="accelerometer"
            >Accelerometer</Checkbox>
          </div>
          <div styleName="checkbox">
            <Checkbox
              checked={fields.gyroscope.value === true}
              onChange={() => fields.gyroscope.onChange(!fields.gyroscope.value)}
              id="gyroscope"
            >Gyroscope</Checkbox>
          </div>
          <div styleName="checkbox">
            <Checkbox
              checked={fields.radar.value === true}
              onChange={() => fields.radar.onChange(!fields.radar.value)}
              id="radar"
            >Radar</Checkbox>
          </div>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="gps" />
        <div styleName="checkbox-options">
          <div styleName="checkbox">
            <Checkbox
              checked={fields.gps.value === true}
              onChange={() => fields.gps.onChange(!fields.gps.value)}
              id="gps"
            >GPS</Checkbox>
          </div>
          <div styleName="checkbox">
            <Checkbox
              checked={fields.obstacleSensors.value === true}
              onChange={() => fields.obstacleSensors.onChange(!fields.obstacleSensors.value)}
              id="obstacleSensors"
            >Obstacle sensors</Checkbox>
          </div>
          <div styleName="checkbox">
            <Checkbox
              checked={fields.altimeter.value === true}
              onChange={() => fields.altimeter.onChange(!fields.altimeter.value)}
              id="altimeter"
            >Ultrasonic altimeter</Checkbox>
          </div>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="description" styleName="desc-label">Drone description:</label>
        <TextareaField {...fields.description} />
      </div>
      {/* row end */}
      <div styleName="actions">
        <Button color="gray" onClick={resetForm} className={styles.btnMargin}>Cancel</Button>
        <Button type="submit" color="blue">Save</Button>
      </div>
      {/* actions end */}
    </form>
  </div>
);

EditDronesForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
};

const fields = ['serialNum', 'name', 'type', 'minSpeed', 'maxSpeed', 'maxFlightTime', 'maxCargoWeight',
  'maxAltitude', 'cameraRes', 'videoRes', 'connectivity', 'engineType', 'numOfRotors', 'altimeter', 'gps',
  'sensors', 'description', 'wifi', 'bluetooth', 'accelerometer', 'gyroscope', 'radar', 'obstacleSensors'];

const validate = (values) => {
  const errors = {};
  if (!values.serialNum) {
    errors.serialNum = 'required';
  }
  if (!values.name) {
    errors.name = 'required';
  }
  if (!values.type) {
    errors.type = 'required';
  }

  return errors;
};

export default reduxForm({form: 'editDrones', fields, validate})(CSSModules(EditDronesForm, styles));
