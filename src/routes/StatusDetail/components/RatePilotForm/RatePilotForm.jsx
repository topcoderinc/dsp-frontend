import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {reduxForm} from 'redux-form';
import _ from 'lodash';
import Button from 'components/Button';
import Rate from 'components/Rate';
import FormField from 'components/FormField';
import styles from './RatePilotForm.scss';

export const RatePilotForm = ({handleSubmit, onCloseClick, fields}) => (
  <form styleName="content" onSubmit={handleSubmit}>
    <div styleName="star-rating">
      <FormField label="Click your vote:" {...fields.rate}>
        <Rate size="big" {..._.pick(fields.rate, 'value', 'onChange')} />
      </FormField>
    </div>
    <div styleName="comment">
      <FormField label="You can also leave a coment about your experience:" {...fields.comment}>
        <textarea styleName="comment-field" {..._.pick(fields.comment, 'type', 'value', 'onChange')} />
      </FormField>
    </div>
    <div styleName="controls">
      <Button color="gray" onClick={onCloseClick}>Cancel</Button>
      <Button color="blue" type="submit">Rate</Button>
    </div>
  </form>
);

RatePilotForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCloseClick: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
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
