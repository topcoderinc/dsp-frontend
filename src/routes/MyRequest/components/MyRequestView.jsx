import React, {PropTypes, Component} from 'react';
import CSSModules from 'react-css-modules';
import Tabs from 'components/Tabs';
import Pagination from 'components/Pagination';
import SelectPerPage from 'components/SelectPerPage';
import styles from './MyRequestView.scss';
import MyRequestFilter from './MyRequestFilter';
import MyRequestItems from './MyRequestItems';

const tabNames = ['New/Pending', 'Scheduled', 'In Progress', 'Completed'];

class MyRequestView extends Component {
  constructor() {
    super();

    this.state = {
      activeTab: 0,
      page: 0,
      limit: 10,
    };

    this.onLimitChange = this.onLimitChange.bind(this);
    this.onSelectTab = this.onSelectTab.bind(this);
    this.getTabList = this.getTabList.bind(this);
    this.loadData = this.loadData.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  onSelectTab(i) {
    this.setState({
      activeTab: i,
      page: 0,
    }, this.loadData);
  }

  onLimitChange(v) {
    this.setState({
      limit: v.value,
      page: 0,
    }, this.loadData);
  }

  onPageChange(v) {
    this.setState({
      page: v.selected,
    }, this.loadData);
  }

  loadData() {
    const {loadRequests, statusArr} = this.props;
    loadRequests(statusArr[this.state.activeTab], this.state.limit, this.state.limit * this.state.page);
  }

  getTabList() {
    const {totals, statusArr} = this.props;
    return tabNames.map((name, i) => ({name: `${name} (${totals[statusArr[i]]})`}));
  }

  render() {
    const {totals, statusArr, requestItems, assignDrone, rejectRequest, loadTotals, getDrones} = this.props;
    return (
      <div styleName="my-request-view">
        <h2>Requests</h2>
        <div styleName="content">
          <div styleName="tab-container">
            <Tabs activeTab={this.state.activeTab} tabList={this.getTabList()} onSelect={this.onSelectTab} />
          </div>
          {
            totals[statusArr[this.state.activeTab]] > 0 ?
            (
              <MyRequestFilter
                itemStartIndex={this.state.limit * this.state.page + 1}
                itemLastIndex={Math.min(totals[statusArr[this.state.activeTab]], this.state.limit * (this.state.page + 1))}
                totalNumberOfItems={totals[statusArr[this.state.activeTab]]}
                displayType={tabNames[this.state.activeTab].toLowerCase()}
                onPressFilter={() => {
                  /* eslint-disable no-alert */
                  alert('Filter Pressed!');
                  /* eslint-enable no-alert */
                }}
              />
            ) :
            (
              <div styleName="no-data">No requests.</div>
            )
          }
          {

          }
          <MyRequestItems
            requestItems={requestItems[statusArr[this.state.activeTab]]}
            currentStatus={statusArr[this.state.activeTab]}
            assignDrone={(requestId, droneId) => assignDrone(requestId, droneId).then(
              () => {
                this.loadData();
                loadTotals();
              }
            )}
            rejectRequest={(id) => rejectRequest(id).then(
              () => {
                this.loadData();
                loadTotals();
              }
            )}
            getDrones={getDrones}
          />
          <div styleName="navigation">
            <div styleName="perpage">
              <SelectPerPage
                value={this.state.limit}
                onChange={this.onLimitChange}
              />
            </div>
            <div styleName="pagination">
              <Pagination
                forcePage={this.state.page}
                pageCount={Math.ceil(totals[statusArr[this.state.activeTab]] / this.state.limit)}
                onPageChange={this.onPageChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyRequestView.propTypes = {
  loadRequests: PropTypes.func.isRequired,
  statusArr: PropTypes.array.isRequired,
  totals: PropTypes.object,
  requestItems: PropTypes.object,
  assignDrone: PropTypes.func.isRequired,
  rejectRequest: PropTypes.func.isRequired,
  loadTotals: PropTypes.func.isRequired,
  getDrones: PropTypes.func.isRequired,
};

export default CSSModules(MyRequestView, styles);
