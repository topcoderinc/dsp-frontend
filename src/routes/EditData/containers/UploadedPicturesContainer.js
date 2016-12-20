import { connect } from 'react-redux';
import UploadedPictures from '../components/UploadedPictures';
import { deletePicture } from '../modules/EditData';


const mapState = (state) => ({...state.editData});

const mapDispatchToProps = (dispatch) => ({
  removePicture: (index) => {
    dispatch(deletePicture(index));
  },
});

export default connect(mapState, mapDispatchToProps)(UploadedPictures);
