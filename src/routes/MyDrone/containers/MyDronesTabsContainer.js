import { connect } from 'react-redux';
import MyDronesTabs from '../components/MyDronesTabs';
import {itemPerPageAction, displayedRowsAction} from '../modules/MyDrone';


const mapState = (state) => state.myDrone;

const mapDispatchToProps = (dispatch) => ({
  itemPerPage: (items) => {
    dispatch(itemPerPageAction(items));
  },
  displayingHandle: (items) => {
    dispatch(displayedRowsAction(items));
  },
});
export default connect(mapState, mapDispatchToProps)(MyDronesTabs);
