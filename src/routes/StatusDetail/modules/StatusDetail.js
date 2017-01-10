import {handleActions} from 'redux-actions';
import APIService from 'services/APIService';

// ------------------------------------
// Constants
// ------------------------------------
export const LOADED = 'StatusDetail/LOADED';
export const SET_CURRENT_GRAPH_TYPE = 'StatusDetail/SET_CURRENT_GRAPH_TYPE';
export const OPEN_RATE_MODAL = 'StatusDetail/OPEN_RATE_MODAL';
export const CLOSE_RATE_MODAL = 'StatusDetail/CLOSE_RATE_MODAL';
export const SEND_RATE = 'StatusDetail/SEND_RATE';

// ------------------------------------
// Actions
// ------------------------------------
export const load = (id) => async(dispatch) => {
  const res = await APIService.getStatusDetail(id);
  const statusDetail = {
    id: res.id,
    status: res.status === 'in-progress' ? 'inProgress' : res.status,
    launchedAt: res.launchDate,
    title: res.title,
    mission: res.mission,
    zones: res.zones,
  };

  const {mission, startingPoint, destinationPoint} = res;

  if (startingPoint && startingPoint.coordinates) {
    statusDetail.startLocation = {
      lng: startingPoint.coordinates[0],
      lat: startingPoint.coordinates[1],
    };
  }

  if (destinationPoint && destinationPoint.coordinates) {
    statusDetail.endLocation = {
      lng: destinationPoint.coordinates[0],
      lat: destinationPoint.coordinates[1],
    };
  }

  if (mission) {
    const {telemetry, pilot, provider} = mission;

    statusDetail.completedAt = mission.completedAt;
    statusDetail.fcStreamSrc = mission.frontCameraUrl;
    statusDetail.bcStreamSrc = mission.backCameraUrl;
    statusDetail.eta = mission.eta;
    statusDetail.missionGallery = mission.gallery;
    if (mission.gallery && mission.gallery.length > 0 && provider && provider.location && provider.location.length > 0) {
      statusDetail.missionGalleryNote = `Filmed By ${provider.name} in ${provider.location[0].city}`;
    }

    if (res.status === 'completed' && provider) {
      statusDetail.projectInfo = {
        contactName: provider.name,
        tel: provider.phone,
        name: res.title,
      };

      if (provider.location && provider.location.length > 0) {
        const location = provider.location[0];
        statusDetail.projectInfo.address = `${location.line1}, ${location.city}, ${location.state}, ${location.postalCode}`;
      }
    }

    statusDetail.droneCoords = {lat: 0, lng: 0};
    statusDetail.providerCoords = {lat: 1, lng: 1};

    if (telemetry) {
      statusDetail.distance = telemetry.distance;
      statusDetail.speed = telemetry.speed;
    }
    if (pilot) {
      statusDetail.driver = pilot.name;
    }
  }

  dispatch({type: LOADED, payload: statusDetail});
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
export const sendRate = (id, {rate, comment}) => (dispatch) => {
  const entity = {
    rating: rate,
  };
  if (comment) {
    entity.publicFeedback = comment;
  }
  return APIService.sendReview(id, entity)
    .then(() => dispatch({type: CLOSE_RATE_MODAL, payload: false}));
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
  showPerformance: false,
});
