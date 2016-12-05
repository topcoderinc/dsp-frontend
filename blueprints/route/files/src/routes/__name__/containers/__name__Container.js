import { asyncConnect } from 'redux-connect';
import {actions} from '../modules/<%= pascalEntityName %>';

import <%= pascalEntityName %>View from '../components/<%= pascalEntityName %>View';

const resolve = [{
  promise: ({ params, store }) => Promise.resolve(),
}];

const mapState = (state) => state.<%= camelEntityName %>;

export default asyncConnect(resolve, mapState, actions)(<%= pascalEntityName %>View);
