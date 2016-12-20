import { connect } from 'react-redux';
import MyServicesTable from '../components/MyServicesTable';
import {itemPerPageAction, displayedRowsAction} from '../modules/MyServices';


const mapState = (state) => state.myServices;

const mapDispatchToProps = (dispatch) => ({
  itemPerPage: (items) => {
    dispatch(itemPerPageAction(items));
  },
  displayingHandle: (items) => {
    dispatch(displayedRowsAction(items));
  },
});
export default connect(mapState, mapDispatchToProps)(MyServicesTable);
