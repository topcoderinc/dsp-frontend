import {connect} from 'react-redux';
import ProviderMap from '../components/ProviderMap';

const mapState = (state) => state.browseProvider;

export default connect(mapState, {})(ProviderMap);
