import { asyncConnect } from 'redux-connect';
import { actions } from '../modules/StatusDetail';

import MissionGallery from '../components/MissionGallery';

const resolve = [{
  promise: ({ params, store }) => store.dispatch(actions.load(params.id)),
}];

const mapState = (state) => ({ items: state.statusDetail.missionGallery, note: state.statusDetail.missionGalleryNote });

export default asyncConnect(resolve, mapState, actions)(MissionGallery);
