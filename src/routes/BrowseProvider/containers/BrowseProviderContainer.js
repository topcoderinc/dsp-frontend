import { asyncConnect } from 'redux-connect';
import { actions, toggleFilter } from '../modules/BrowseProvider';

import BrowseProviderView from '../components/BrowseProviderView';

const resolve = [{
  promise: () => Promise.resolve(),
}];

const mapDispatchToProps = (dispatch) => ({
  handleFilterToggle: (value) => {
    dispatch(toggleFilter(value));
  },
});
const mapState = (state) => state.browseProvider;

export default asyncConnect(resolve, mapState, mapDispatchToProps)(BrowseProviderView);
