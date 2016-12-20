import { connect } from 'react-redux';
import EditDataHeader from '../components/EditDataHeader';

const mapState = (state) => state.editData;

export default connect(mapState, {})(EditDataHeader);
