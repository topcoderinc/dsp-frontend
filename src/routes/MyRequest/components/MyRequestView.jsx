import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Tabs from 'components/Tabs';
import Pagination from 'components/Pagination';
import styles from './MyRequestView.scss';
import MyRequestFilter from './MyRequestFilter';
import MyRequestItemsContainer from '../containers/MyRequestItemsContainer';

const tabList = [{
  name: 'New/Pending (5)',
}, {
  name: 'Scheduled (3)',
}, {
  name: 'In Progress (3)',
}, {
  name: 'Completed (3)',
}];

export const MyRequestView = ({activeTab}) => (
  <div styleName="my-request-view">
    <h2>Requests</h2>
    <div styleName="content">
      <div styleName="tab-container">
        <Tabs activeTab={activeTab || 0} tabList={tabList} />
      </div>
      <MyRequestFilter itemStartIndex={1} itemLastIndex={5} totalNumberOfItems={5} displayType={'new/pending'} onPressFilter={() => alert('Filter Pressed!')} />
      <MyRequestItemsContainer />
      <div styleName="pagination-container">
        <Pagination pages={4} activePageIndex={0} />
      </div>
    </div>
  </div>
);

MyRequestView.propTypes = {
  activeTab: PropTypes.number,
};

export default CSSModules(MyRequestView, styles);
