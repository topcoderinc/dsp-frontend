import Header from 'components/Header';
import { connect } from 'react-redux';

const mapState = (state) => state.global;

export default connect(mapState, {})(Header);
