import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {reduxForm} from 'redux-form';
import _ from 'lodash';
import Button from 'components/Button';
import Rate from 'components/Rate';
import FormField from 'components/FormField';
import styles from './RatePilotForm.scss';

export const RatePilotForm = ({handleSubmit, onCloseClick, fields, readMode}) => (
  <form styleName="content" onSubmit={handleSubmit}>
    <div styleName="star-rating">
      <FormField label={readMode ? 'you voted:' : 'Click your vote:'} {...fields.rate}>
        <Rate size="big" value={fields.rate.value} onChange={readMode ? null : fields.rate.onChange} />
      </FormField>
    </div>
    <div styleName="comment">
      <FormField label={readMode ? 'Your comment:' : 'You can also leave a coment about your experience:'} {...fields.comment}>
        <textarea
          styleName="comment-field"
          {..._.pick(fields.comment, 'type', 'value', 'onChange')}
          readOnly={readMode}
        />
      </FormField>
    </div>
    {
      readMode ? null :
      (
        <div styleName="controls">
          <Button color="gray" onClick={onCloseClick}>Cancel</Button>
          <Button color="blue" type="submit">Rate</Button>
        </div>
      )
    }
  </form>
);

RatePilotForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  readMode: PropTypes.bool,
};

const fields = ['rate', 'comment'];

const validate = (values) => {
  const errors = {};

  if (!values.rate) {
    errors.rate = 'required';
  }

  return errors;
};

export default reduxForm({form: 'ratePilot', fields, validate})(CSSModules(RatePilotForm, styles));
