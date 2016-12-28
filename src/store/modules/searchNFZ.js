import {handleActions} from 'redux-actions';
import APIService from 'services/APIService';

export const MAX_DRONES = 1000;

// ------------------------------------
// Constants
// ------------------------------------
export const LOAD_NFZ = 'searchNFZ/LOAD_NFZ';

// ------------------------------------
// Actions
// ------------------------------------

// map google maps bounds to polygon format accepted by API
export const mapsBoundsToPolygon = (bounds) => [[
  [bounds.west, bounds.north],
  [bounds.east, bounds.north],
  [bounds.east, bounds.south],
  [bounds.west, bounds.south],
  [bounds.west, bounds.north],
]];

// load zones based on current google maps bounds
export const loadNfz = (bounds) => async (dispatch) => {
  const coordinates = mapsBoundsToPolygon(bounds);
  const {items: zones} = await APIService.searchNfz({
    offset: 0,
    limit: MAX_DRONES,
    isActive: true,
    matchTime: true,
    geometry: {
      type: 'Polygon',
      coordinates,
    },
  });
  dispatch({type: LOAD_NFZ, payload: zones});
};

export const actions = {
  loadNfz,
};

// ------------------------------------
// Reducer
// ------------------------------------


export default handleActions({
  [LOAD_NFZ]: (state, {payload: zones}) => ({noFlyZones: zones}),
}, {
  noFlyZones: [],
});
