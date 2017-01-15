import {handleActions} from 'redux-actions';
import APIService from 'services/APIService';
import AWS from 'aws-sdk-promise';
import uuid from 'uuid';
import _ from 'lodash';

// ------------------------------------
// Actions
// ------------------------------------

const DELETE_PICTURE = 'DELETE_PICTURE';
const MARK_PICTURE_DELETING = 'MARK_PICTURE_DELETING';
const ADD_PICTURE = 'ADD_PICTURE';
const PICTURE_UPLOADED = 'PICTURE_UPLOADED';
const LOADED = 'LOADED';

export const sendRequest = (values) => new Promise((resolve) => {
  alert(JSON.stringify(values, null, 2));
  resolve();
});

// load initial data and get federation token
export const load = (requestId) => async(dispatch) => {
  // TODO: requestId should be from query string
  // mock implementation for demo
  const result = await APIService.getFederationToken({
    type: 'REQUEST',
    requestId,
  });

  const s3 = new AWS.S3({
    region: result.region,
    credentials: result.credentials,
  });

  const {data: {Contents: images}} = await s3.listObjects({
    Bucket: result.data.s3Bucket,
    Prefix: result.data.s3KeyPrefix,
  }).promise();
  const pictures = _(images)
    .reject((item) => _.endsWith(item.Key, '/')) // ignore folders
    .map((item) => ({
      key: item.Key,
      status: 'uploaded',
      src: s3.getSignedUrl('getObject', {Bucket: result.data.s3Bucket, Key: item.Key}),
      file: getFileInfo(item.Key),
    }))
    .value();
  dispatch({type: LOADED, payload: {...result.data, s3, pictures}});
};

// get file info based on file name
const getFileInfo = (key) => {
  const fileName = key.split('/').pop();
  const fileExtension = fileName.split('.').pop();

  const fileInfo = {
    name: fileName,
  };

  if (fileExtension === 'jpeg' || fileExtension === 'jpg' || fileExtension === 'gif' || fileExtension === 'png' || fileExtension === 'bmp') {
    fileInfo.type = 'image';
  } else if (fileExtension === 'pdf') {
    fileInfo.type = 'pdf';
  } else if (fileExtension && fileExtension.length > 0) {
    fileInfo.type = fileExtension;
  } else {
    fileInfo.type = 'file';
  }
  return fileInfo;
};

// upload picture to AWS
export const uploadPicture = (file) => async(dispatch, getState) => {
  const {s3KeyPrefix, s3Bucket, s3} = getState().editData;
  const key = `${s3KeyPrefix}${uuid.v4()}--${file.name}`;
  const request = s3.putObject({
    Bucket: s3Bucket,
    Key: key,
    Body: file,
    ContentType: file.type,
  });
  // show picture immediately with html5 preview
  dispatch({
    type: ADD_PICTURE,
    payload: {
      abort: () => request.abort(),
      key,
      status: 'uploading',
      src: await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      }),
      file: getFileInfo(file.name),
    },
  });
  await request.promise();
  dispatch({
    type: PICTURE_UPLOADED,
    payload: {
      key,
      url: s3.getSignedUrl('getObject', {Bucket: s3Bucket, Key: key}),
    },
  });
};

// delete picture from s3 or cancel upload
export const deletePicture = (item) => async(dispatch, getState) => {
  const {s3Bucket, s3} = getState().editData;

  if (item.status === 'uploading') {
    item.abort();
    dispatch({type: DELETE_PICTURE, payload: item.key});
  } else {
    dispatch({type: MARK_PICTURE_DELETING, payload: item.key});
    await s3.deleteObject({
      Bucket: s3Bucket,
      Key: item.key,
    }).promise();
    dispatch({type: DELETE_PICTURE, payload: item.key});
  }
};

export const actions = {
  deletePicture,
  uploadPicture,
  load,
};

// ------------------------------------
// Reducer
// ------------------------------------

const getDefaultState = () => ({
  s3: null,
  s3Bucket: null,
  s3KeyPrefix: null,
  pictures: [],
});

export default handleActions({
  [DELETE_PICTURE]: (state, {payload: key}) => ({
    ...state,
    pictures: _.reject(state.pictures, ['key', key]),
  }),
  [ADD_PICTURE]: (state, {payload}) => ({
    ...state,
    pictures: [...state.pictures, payload],
  }),
  [LOADED]: (state, {payload}) => ({...getDefaultState(), ...payload}),
  [PICTURE_UPLOADED]: (state, {payload: {key, url}}) => ({
    ...state,
    pictures: state.pictures.map((item) => {
      if (item.key === key) {
        return {...item, src: url, status: 'uploaded'};
      }
      return item;
    }),
  }),
  [MARK_PICTURE_DELETING]: (state, {payload: key}) => ({
    ...state,
    pictures: state.pictures.map((item) => {
      if (item.key === key) {
        return {...item, status: 'deleting'};
      }
      return item;
    }),
  }),
}, getDefaultState());
