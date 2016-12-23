import {createAction, handleActions} from 'redux-actions';
import APIService from 'services/APIService';
import _ from 'lodash';
import circleToPolygon from 'circle-to-polygon';
import {MAX_DRONES, mapsBoundsToPolygon} from 'store/modules/searchNFZ';

const CIRCLE_TO_POLYGON_SEGMENTS = 36;

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_NFZ = 'NoFlyZones/LOAD_NFZ';
export const ADD_ZONE = 'NoFlyZones/ADD_ZONE';
export const UPDATE_ZONE = 'NoFlyZones/UPDATE_ZONE';
export const SAVE_NFZ = 'NoFlyZones/SAVE_NFZ';
export const DELETE_ZONE = 'NoFlyZones/DELETE_ZONE';

// ------------------------------------
// Actions
// ------------------------------------


// load zones based on current google maps bounds
export const loadNfz = (bounds) => async (dispatch) => {
  const coordinates = mapsBoundsToPolygon(bounds);
  const {items: zones} = await APIService.searchNfz({
    offset: 0,
    limit: MAX_DRONES,
    geometry: {
      type: 'Polygon',
      coordinates,
    },
  });
  dispatch({type: LOAD_NFZ, payload: zones});
};

export const saveNfz = (zone) => async (dispatch) => {
  const values = _.omit(zone, 'isNew', 'isEdited', 'id');
  if (values.isPermanent) {
    delete values.startTime;
    delete values.endTime;
  }
  if (zone.isNew) {
    const result = await APIService.createNfz(values);
    dispatch({type: SAVE_NFZ, payload: {existing: zone, newZone: result}});
  } else {
    const result = await APIService.updateNfz(zone.id, values);
    dispatch({type: UPDATE_ZONE, payload: result});
  }
};

export const deleteNfz = (zone) => async (dispatch) => {
  if (!zone.isNew) {
    await APIService.deleteNfz(zone.id);
  }
  dispatch({type: DELETE_ZONE, payload: zone});
};

export const actions = {
  loadNfz,
  saveNfz,
  deleteNfz,
  addZone: createAction(ADD_ZONE),
  updateZone: createAction(UPDATE_ZONE),
};

// ------------------------------------
// Reducer
// ------------------------------------


export default handleActions({
  [LOAD_NFZ]: (state, {payload: zones}) => {
    const edits = _(state.zones).filter('isEdited').keyBy('id').value();
    return {
      ...state,
      zones: [
        ..._.filter(state.zones, 'isNew'),
        ...zones.map((zone) => edits[zone.id] || zone),
      ],
    };
  },
  [ADD_ZONE]: (state, {payload: {coordinates, circle}}) => {
    const zone = {
      id: new Date().getTime(),
      description: 'New Zone',
      isNew: true,
      isActive: true,
      isPermanent: true,
      location: circle ? circleToPolygon(circle.center, circle.radius, CIRCLE_TO_POLYGON_SEGMENTS) : {
        type: 'Polygon',
        coordinates: [[...coordinates, coordinates[0]]],
      },
      circle,
      style: {
        fillColor: 'red',
      },
    };
    return {...state, zones: [zone, ...state.zones]};
  },
  [UPDATE_ZONE]: (state, {payload: zone}) => ({
    ...state,
    zones: state.zones.map((item) => {
      if (item.id === zone.id) {
        return zone;
      }
      return item;
    }),
  }),
  [SAVE_NFZ]: (state, {payload: {existing, newZone}}) => ({
    ...state,
    zones: state.zones.map((item) => {
      if (item.id === existing.id) {
        return newZone;
      }
      return item;
    }),
  }),
  [DELETE_ZONE]: (state, {payload: zone}) => ({
    ...state,
    zones: state.zones.filter((item) => item.id !== zone.id),
  }),
}, {
  added: [],
  zones: [],
});
