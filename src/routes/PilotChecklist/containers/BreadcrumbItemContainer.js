import {connect} from 'react-redux';

// we use global BreadcrumbItem component to display breadcrumb item,
// just pass a title property here
import BreadcrumbItem from 'components/BreadcrumbItem';

const mapState = (state) => ({
  title: state.pilotChecklist.missionName,
});

export default connect(mapState, {})(BreadcrumbItem);
