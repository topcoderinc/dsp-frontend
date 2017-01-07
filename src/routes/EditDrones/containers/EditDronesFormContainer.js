import {connect} from 'react-redux';
import {actions} from '../modules/EditDrones';
import _ from 'lodash';

import EditDronesForm from '../components/EditDronesForm';

const mapState = (state) => ({...state.editDrones, initialValues: {...state.editDrones.drone, droneName: state.editDrones.drone.name}});

export default connect(mapState, {
  onSubmit: (values) => actions.save({..._.omit(values, ['droneName']), name: values.droneName}),
  cancel: actions.cancel,
})(EditDronesForm);
