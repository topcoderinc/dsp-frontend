import { asyncConnect } from 'redux-connect';
import { actions } from '../modules/StatusDetail';

import ModalRatePilot from '../components/ModalRatePilot';

const resolve = [{
  promise: ({ params, store }) => store.dispatch(actions.load(params.id)),
}];

const mapState = (state) => ({ isOpen: state.statusDetail.isRateModalOpen });

export default asyncConnect(resolve, mapState, {
  onClose: actions.closeRateModal,
  onRate: actions.sendRate,
  onOpen: actions.openRateModal,
})(ModalRatePilot);
