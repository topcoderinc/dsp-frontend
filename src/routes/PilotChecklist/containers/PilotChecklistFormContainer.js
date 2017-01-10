import {connect} from 'react-redux';
import {actions} from '../modules/PilotChecklist';
import _ from 'lodash';

import PilotChecklistForm from '../components/PilotChecklistForm';

/**
 * Create initial values for the checklist form
 * it takes into account that we can have not all answers,
 * but form requires full quantity of elements, so we create empty answers when need
 *
 * @param  {Array} questions list of all questions
 * @param  {Array} answers)  list of answers, could be not for all questions
 * @return {Object}          initialValues for the form
 */
const answersToInitialValues = (questions, answers) => ({
  answers: _.map(questions, (question) => (
    {
      ...{answer: undefined, note: undefined}, // eslint-disable-line no-undefined
      ..._.find(answers, {question: question.id}),
    }
  )),
});

const mapState = (state) => ({
  questions: state.pilotChecklist.questions,
  initialValues: answersToInitialValues(state.pilotChecklist.questions, state.pilotChecklist.answers),
  missionStatus: state.pilotChecklist.missionStatus,
});

export default connect(mapState, {
  save: actions.save,
})(PilotChecklistForm);
