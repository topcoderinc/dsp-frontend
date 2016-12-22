import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import TextField from 'components/TextField';
import DatePicker from 'components/DatePicker';
import cn from 'classnames';
import styles from './TelemetryDataForm.scss';


const FormField = ({error, touched, children}) => (
  <div className={cn('form-field', {error: error && touched})}>
    {children}
    {error && touched && <div className="error-message">{error}</div>}
  </div>
);
FormField.propTypes = {
  error: PropTypes.string,
  touched: PropTypes.bool,
  children: PropTypes.any.isRequired,
};

/*
* DroneDetailsTabs
*/

export const TelemetryDataForm = ({fields}) => (
  <div>
    <div styleName="telemetry-data-form">
      <div styleName="row">
        <label htmlFor="timeoflunch">Time of launch:</label>
        <div className="date-picker-container">
          <FormField {...fields.launchDate}>
            <DatePicker {...fields.launchDate} />
          </FormField>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="timemission">Time mission completed:</label>
        <div className="date-picker-container">
          <FormField {...fields.missionDate}>
            <DatePicker {...fields.missionDate} />
          </FormField>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="traveldistance">Travel distance:</label>
        <div className="dis-speed-input">
          <FormField {...fields.distance}>
            <TextField {...fields.distance} />
          </FormField>
          <span className="unit">miles</span>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="avgspeed">Average speed:</label>
        <div className="dis-speed-input">
          <FormField {...fields.avgSpeed}>
            <TextField {...fields.avgSpeed} />
          </FormField>
          <span className="unit">mph</span>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="maxspeed">Maximumn speed:</label>
        <div className="dis-speed-input">
          <FormField {...fields.maxSpeed}>
            <TextField {...fields.maxSpeed} />
          </FormField>
          <span className="unit">mph</span>
        </div>
      </div>
      {/* row end */}
      <div styleName="row">
        <label htmlFor="minspeed">Minimum speed:</label>
        <div className="dis-speed-input">
          <FormField {...fields.minSpeed}>
            <TextField {...fields.minSpeed} />
          </FormField>
          <span className="unit">mph</span>
        </div>
      </div>
      {/* row end */}
    </div>
  </div>
);

TelemetryDataForm.propTypes = {
  fields: PropTypes.object.isRequired,
};

export default CSSModules(TelemetryDataForm, styles);
