import {handleActions} from 'redux-actions';
import APIService from 'services/APIService';
import {toastr} from 'react-redux-toastr';
import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'PilotChecklist/LOADED';
export const UPDATED = 'PilotChecklist/UPDATED';

// ------------------------------------
// Actions
// ------------------------------------
export const load = (missionId) => async(dispatch) => {
  const response = await APIService.getPilotChecklist(missionId);
  const answers = response.pilotChecklist ? response.pilotChecklist.answers : [];

  dispatch({type: LOADED, payload: {..._.pick(response, ['missionStatus', 'questions']), answers, missionId}});
};

export const save = (values) => async (dispatch, getState) => {
  const questions = getState().pilotChecklist.questions;
  // send to server only not empty answers and not empty answer properties
  const notEmptyAnswers = [];
  _.forEach(values.answers, (answerRow, index) => {
    const notEmptyAnswer = {};
    const hasAnswer = !!answerRow.answer;
    const hasNote = _.isString(answerRow.note) && answerRow.note.trim() !== '';

    if (hasAnswer || hasNote) {
      hasAnswer && (notEmptyAnswer.answer = answerRow.answer);
      hasNote && (notEmptyAnswer.note = answerRow.note);
      // add question id to the answer
      notEmptyAnswer.question = questions[index].id;
      notEmptyAnswers.push(notEmptyAnswer);
    }
  });

  const response = await APIService.updatePilotChecklist(getState().pilotChecklist.missionId, {
    answers: notEmptyAnswers,
    load: values.pressedButton === 'saveload',
  });
  dispatch({
    type: UPDATED,
    payload: {
      missionStatus: response.missionStatus,
      answers: response.pilotChecklist.answers,
    },
  });
  if (values.pressedButton === 'saveload') {
    toastr.success('Checklist saved and mission loaded');
  } else {
    toastr.success('Checklist saved');
  }
};

export const actions = {
  load,
  save,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOADED]: (state, {payload}) => ({...state, ...payload}),
  [UPDATED]: (state, {payload}) => ({...state, ...payload}),
}, {
  missionId: '',
  missionStatus: '',
  questions: [],
  answers: [],
});
