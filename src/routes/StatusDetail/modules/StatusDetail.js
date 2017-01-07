import {handleActions} from 'redux-actions';
import APIService from 'services/APIService';
import AWS from 'aws-sdk-promise';
import _ from 'lodash';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'StatusDetail/LOADED';
export const SET_CURRENT_GRAPH_TYPE = 'StatusDetail/SET_CURRENT_GRAPH_TYPE';
export const OPEN_RATE_MODAL = 'StatusDetail/OPEN_RATE_MODAL';
export const CLOSE_RATE_MODAL = 'StatusDetail/CLOSE_RATE_MODAL';

// ------------------------------------
// Actions
// ------------------------------------
export const load = (id) => async(dispatch) => {
  // TODO: API doesn't return missionId
  // mock implementation for demo
  const missionId = '594d77ec37275a4d97dddb0c';
  const [statusDetail, awsData] = await Promise.all([
    APIService.getStatusDetail(id),
    APIService.getFederationToken({
      type: 'MISSION',
      missionId,
    }),
  ]);

  const s3 = new AWS.S3({
    region: awsData.region,
    credentials: awsData.credentials,
  });

  const {data: {Contents: images}} = await s3.listObjects({
    Bucket: awsData.data.s3Bucket,
    Prefix: awsData.data.s3KeyPrefix,
  }).promise();

  const galleryUrls = _(images)
    .reject((item) => _.endsWith(item.Key, '/')) // ignore folders
    .map((item) => ({
      type: 'image',
      src: s3.getSignedUrl('getObject', {
        Bucket: awsData.data.s3Bucket,
        Key: item.Key,
      }).split('?')[0], // strip signing params
    }))
    .value();
  dispatch({type: LOADED, payload: {...statusDetail, galleryUrls}});
};

export const setCurrentGraphType = (currentGraphType) => async(dispatch) => {
  dispatch({type: SET_CURRENT_GRAPH_TYPE, payload: currentGraphType});
};

export const openRateModal = () => async(dispatch) => {
  dispatch({type: OPEN_RATE_MODAL, payload: true});
};

export const closeRateModal = () => async(dispatch) => {
  dispatch({type: CLOSE_RATE_MODAL, payload: false});
};

// send rate and comment here
/* eslint-disable no-unused-vars */
export const sendRate = ({rate, comment}) => async(dispatch) => {
  dispatch({type: CLOSE_RATE_MODAL, payload: false});
};
/* eslint-enable no-unused-vars */

export const actions = {
  load,
  setCurrentGraphType,
  openRateModal,
  closeRateModal,
  sendRate,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [LOADED]: (state, {payload: statusDetail}) => ({...state, ...statusDetail}),
  [SET_CURRENT_GRAPH_TYPE]: (state, {payload: currentGraphType}) => ({...state, currentGraphType}),
  [OPEN_RATE_MODAL]: (state, {payload: isRateModalOpen}) => ({...state, isRateModalOpen}),
  [CLOSE_RATE_MODAL]: (state, {payload: isRateModalOpen}) => ({...state, isRateModalOpen}),
}, {
  currentGraphType: 'speed',
  isRateModalOpen: false,
  galleryUrls: [],
});
