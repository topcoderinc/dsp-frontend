import {connect} from 'react-redux';
import {actions, sendRequest} from '../modules/EditDrones';

import EditDronesForm from '../components/EditDronesForm';

const mapState = (state) => ({...state.editDrones, onSubmit: sendRequest});

export default connect(mapState, actions)(EditDronesForm);
