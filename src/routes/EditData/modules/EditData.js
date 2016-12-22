import {handleActions, createAction} from 'redux-actions';
// ------------------------------------
// Actions
// ------------------------------------


export const sendRequest = (values) => new Promise((resolve) => {
  alert(JSON.stringify(values, null, 2));
  resolve();
});

export const deletePicture = createAction('DELETE_PICTURE');
export const uploadPicture = createAction('UPLOAD_PICTURE');

export const actions = {
  deletePicture,
  uploadPicture,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [deletePicture]: (state, action) => ({
    ...state, ...state.uploadedPictures.splice(action.payload, 1),
  }),
  [uploadPicture]: (state, action) => ({
    ...state, uploadedPictures: [...state.uploadedPictures, action.payload],
  }),
},
  {
  // initial data
    uploadedPictures: [
    {imageSrc: 'uploaded-pic-1.png'},
    {imageSrc: 'uploaded-pic-2.png'},
    {imageSrc: 'uploaded-pic-3.png'},
    {imageSrc: 'uploaded-pic-4.png'}],
  });
