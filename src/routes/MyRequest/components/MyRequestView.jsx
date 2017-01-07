import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Tabs from 'components/Tabs';
import Pagination from 'components/Pagination';
import SelectPerPage from 'components/SelectPerPage';
import styles from './MyRequestView.scss';
import MyRequestFilter from './MyRequestFilter';
import MyRequestItemsContainer from '../containers/MyRequestItemsContainer';
import _ from 'lodash';

const tabList = [{
  name: 'New/Pending (5)',
}, {
  name: 'Scheduled (3)',
}, {
  name: 'In Progress (3)',
}, {
  name: 'Completed (3)',
}];

export const MyRequestView = ({activeTab, requestItems, limit, offset}) => (
  <div styleName="my-request-view">
    <h2>Requests</h2>
    <div styleName="content">
      <div styleName="tab-container">
        <Tabs activeTab={activeTab || 0} tabList={tabList} />
      </div>
      <MyRequestFilter
        itemStartIndex={1}
        itemLastIndex={5}
        totalNumberOfItems={5}
        displayType={'new/pending'}
        onPressFilter={() => {
          /* eslint-disable no-alert */
          alert('Filter Pressed!');
          /* eslint-enable no-alert */
        }}
      />
      <MyRequestItemsContainer />

      <div styleName="navigation">
        <div styleName="perpage">
          <SelectPerPage
            value={limit}
            onChange={_.noop}
          />
        </div>
        <div styleName="pagination">
          <Pagination
            forcePage={Math.ceil(offset / limit)}
            pageCount={Math.ceil(requestItems.length / limit)}
            onPageChange={_.noop}
          />
        </div>
      </div>

    </div>
  </div>
);

MyRequestView.propTypes = {
  activeTab: PropTypes.number,
  requestItems: PropTypes.array.isRequired,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
};

export default CSSModules(MyRequestView, styles);
