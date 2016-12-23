import {handleActions} from 'redux-actions';
import APIService from 'services/APIService';
// ------------------------------------
// Actions
// ------------------------------------

export const actions = {
};

export const sendRequest = (values) => new Promise((resolve, reject) => {
  APIService.resetPassword(values).then((result) => {
    resolve(result);
  }).catch((reason) => {
    reject(reason);
  });
});

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
}, {
});
