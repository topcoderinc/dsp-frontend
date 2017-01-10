import {handleActions, createAction} from 'redux-actions';
import _ from 'lodash';
import APIService from 'services/APIService';

// ------------------------------------
// Actions
// ------------------------------------


export const sendRequest = (values) => new Promise((resolve) => {
  /* eslint-disable no-alert */
  alert(JSON.stringify(values, null, 2));
  /* eslint-enable no-alert */
  resolve();
});

const REQUESTS_LOADED = 'MY-REQUEST/REQUESTS_LOADED';
const TOTALS_LOADED = 'MY-REQUEST/TOTALS_LOADED';

const statusArr = ['pending', 'in-progress', 'scheduled', 'completed'];

export const actions = {
  requestLoaded: createAction(REQUESTS_LOADED),
  totalsLoaded: createAction(TOTALS_LOADED),
};

const getLatLng = (location) => {
  if (_.get(location, 'coordinates', []).length === 2) {
    return {
      lng: location.coordinates[0],
      lat: location.coordinates[0],
    };
  }
  return null;
};

export const loadRequests = (dispatch, statuses, limit, offset) =>
    APIService.getRequestsByProvider({
      statuses,
      limit,
      offset,
    })
    .then((res) => dispatch(actions.requestLoaded(
      {
        total: res.total,
        items: res.items.map((item) => ({
          ...(_.pick(item, 'status', 'distance', 'payout', 'customer', 'weight', 'whatToBeDelivered', 'serviceType', 'zones', 'title')),
          requestId: item.id,
          deliveryLocation: item.destinationPoint ? `${item.destinationPoint.line1}, ${item.destinationPoint.city}, ${item.destinationPoint.state} ${item.destinationPoint.postalCode}` : null,
          deliveryDate: item.launchDate,
          requestedDeliveryTime: item.launchDate,
          pickUpLocation: item.startingPoint ? `${item.startingPoint.line1}, ${item.startingPoint.city}, ${item.startingPoint.state} ${item.startingPoint.postalCode}` : null,
          dropOffLocation: item.destinationPoint ? `${item.destinationPoint.line1}, ${item.destinationPoint.city}, ${item.destinationPoint.state} ${item.destinationPoint.postalCode}` : null,
          packageType: item.serviceType,
          startLocation: getLatLng(item.startingPoint),
          endLocation: getLatLng(item.destinationPoint),
        })),
        status: statuses,
      }
        )
      )
    );

export const loadTotals = (dispatch) => Promise.all(
    _.map(
      statusArr,
      (statuses) => APIService.getRequestsByProvider({
        limit: 1,
        statuses,
      }).then((res) => res.total)
    )
  ).then((res) => dispatch(actions.totalsLoaded(_.zipObject(statusArr, res))));

export const assignDrone = (id, droneId) => APIService.acceptRequest(id).then(() => APIService.assignDrone(id, droneId));
export const rejectRequest = (id) => APIService.rejectRequest(id);
export const getDrones = () => APIService.getProviderDrones();


// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [REQUESTS_LOADED]: (state, {payload}) => ({
    ...state,
    requestItems: {
      ...state.requestItems,
      [payload.status]: payload.items,
    },
    totals: {
      ...state.totals,
      [payload.state]: payload.total,
    },
  }),
  [TOTALS_LOADED]: (state, {payload}) => ({
    ...state,
    totals: payload,
  }),
}, {
  statusArr,
  totals: _.zipObject(statusArr, _.times(statusArr.length, _.constant(0))),
  requestItems: _.zipObject(statusArr, _.times(statusArr.length, () => ([]))),
});
