import Header2 from 'components/Header2';
import { connect } from 'react-redux';

const mapState = (state) => state.global;

export default connect(mapState, {})(Header2);
