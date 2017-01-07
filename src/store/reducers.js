import {combineReducers} from 'redux';
import {routerReducer as router} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-connect';
import {reducer as form} from 'redux-form';
import {reducer as toastr} from 'react-redux-toastr';
import global from './modules/global';
import _ from 'lodash';

/**
 * Normalize form field of a number type
 * @param  {Mixed} value         current field value
 * @param  {Mixed} previousValue previous field value
 * @return {Mixed}               resulting field value
 */
const normalizeFloat = (value, previousValue) => (
  _.isString(value) && !value.match(/^\d*(\.\d*)?$/) ? previousValue : value
);

/**
 * Normalize form field of an integer type
 * @param  {Mixed} value         current field value
 * @return {Mixed}               resulting field value
 */
const normalizeInteger = (value) => (
  _.isString(value) ? value.replace(/[^\d]/g, '') : value
);

export const makeRootReducer = (asyncReducers) => combineReducers({
  router,
  global,
  form: form.normalize({
    editDrones: {
      numberOfRotors: normalizeInteger,
      minSpeed: normalizeFloat,
      maxSpeed: normalizeFloat,
      maxFlightTime: normalizeFloat,
      maxCargoWeight: normalizeFloat,
      maxAltitude: normalizeFloat,
      cameraResolution: normalizeFloat,
      videoResolution: normalizeFloat,
      mileage: normalizeFloat,
    },
  }),
  reduxAsyncConnect,
  ...asyncReducers,
  toastr,
});

export const injectReducer = (store, {key, reducer}) => {
  store.asyncReducers[key] = reducer; // eslint-disable-line no-param-reassign
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;
