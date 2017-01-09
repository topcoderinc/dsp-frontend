import React, {PropTypes, Component} from 'react';
import {reduxForm} from 'redux-form';
import Button from 'components/Button';
import Radiobox from 'components/Radiobox';
import TextareaField from 'components/TextareaField';
import CSSModules from 'react-css-modules';
import styles from './PilotChecklistForm.scss';
import _ from 'lodash';

export class PilotChecklistForm extends Component {
  constructor(props) {
    super(props);

    this.onButtonClick = this.onButtonClick.bind(this);
    PilotChecklistForm.pressedButton = null;
  }

  onButtonClick(name) {
    PilotChecklistForm.pressedButton = name;
    this.props.handleSubmit((values) => this.props.save({...values, pressedButton: name}))();
  }

  render() {
    const {questions, fields, missionStatus} = this.props;
    const isReadonly = _.includes(['completed', 'in-progress'], missionStatus);
    const hasErrors = _.find(fields.answers, (answerRow) => answerRow.answer.error || answerRow.note.error);

    return (
      <form styleName="pilot-checklist-form">
        <div>
          {fields.answers.map((answerRow, index) => (
            <div key={questions[index].id} styleName="question">
              <h4>{questions[index].text}</h4>
              <div styleName="radioboxes">
                <div styleName="radiobox"><Radiobox {...answerRow.answer} radioValue="yes" disabled={isReadonly}>Yes</Radiobox></div>
                <div styleName="radiobox"><Radiobox {...answerRow.answer} radioValue="no" disabled={isReadonly}>No</Radiobox></div>
                <div styleName="radiobox"><Radiobox {...answerRow.answer} radioValue="note" disabled={isReadonly}>No, but proceed with caution</Radiobox></div>
                {answerRow.answer.error && <div styleName="error">{answerRow.answer.error}</div>}
              </div>
              <div styleName="note">
                <div styleName="note-label-wrap">
                  <label htmlFor={answerRow.note.name} styleName="note-label">Note:</label>
                  {answerRow.note.error && <div styleName="error">{answerRow.note.error}</div>}
                </div>
                <TextareaField id={answerRow.note.name} size="small" {...answerRow.note} readOnly={isReadonly} />
              </div>
            </div>
          ))}
        </div>
        {!isReadonly && <div styleName="actions">
          <div styleName="global-error">{hasErrors && <div styleName="error">To load mission, answers to all the questions has to be &quot;Yes&quot;, or &quot;No, but proceed with caution&quot; with provided &quot;Note&quot;</div>}</div>
          <Button color="gray" onClick={() => this.onButtonClick('save')}>Save</Button>
          <Button onClick={() => this.onButtonClick('saveload')}>Save and load mission</Button>
        </div>}
      </form>
    );
  }
}

PilotChecklistForm.propTypes = {
  questions: PropTypes.array.isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  missionStatus: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
};

const fields = [
  'answers[].answer',
  'answers[].note',
];

/**
 * Validate function for redux form
 * @param  {Object} values values to validate
 * @return {Object}        errors
 */
const validate = (values) => {
  const errors = {};

  if (PilotChecklistForm.pressedButton === 'saveload') {
    errors.answers = _.map(values.answers, (answerRow) => {
      let err;

      if (_.isNil(answerRow.answer)) {
        err = {answer: 'Answer is required'};
      } else if (answerRow.answer === 'no') {
        err = {answer: 'Answer cannot be "No"'};
      } else if (answerRow.answer === 'note' && (!_.isString(answerRow.note) || answerRow.note.trim() === '')) {
        err = {note: 'You have to provide a "Note", when you chose "No, but proceed with caution"'};
      }

      return err;
    });
  }

  return errors;
};

export default reduxForm({form: 'pilotChecklist', fields, validate})(CSSModules(PilotChecklistForm, styles));
