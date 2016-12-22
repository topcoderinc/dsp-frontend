import React, { PropTypes, Component } from 'react';
import Reactable from 'reactable';
import CSSModules from 'react-css-modules';
import Dropdown from 'react-dropdown';
import styles from './MyServicesTable.scss';


const Table = Reactable.Table;


/*
* MyServicesTable
*/
class MyServicesTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: { value: 10, label: '10' },
    };
  }

  render() {
    const { servicesTableData, itemPerPage, items, displayingHandle, displaying } = this.props;
    let currentPageNum = 0;
    const options = [
      { value: 10, label: '10' },
      { value: 15, label: '15' },
      { value: 20, label: '20' },
    ];

    function calcuDisplaying(perPage, pageNum) {
      let start = perPage.value * pageNum;
      start += 1;
      let end = perPage.value * pageNum + perPage.value;
      if (end > servicesTableData.length) {
        end = servicesTableData.length;
      }
      const displayingObj = {start, end, currentPage: pageNum};

      displayingHandle(displayingObj);
    }

    function onChange(val) {
      itemPerPage(val);
      currentPageNum = displaying.currentPage;

      let start = val.value * currentPageNum;
      start += 1;
      let end = val.value * currentPageNum + val.value;
      if (start > servicesTableData.length) {
        start = servicesTableData.length - val.value;
      }
      if (end > servicesTableData.length) {
        end = servicesTableData.length;
      }

      const displayingObj = {start, end, currentPage: currentPageNum};

      displayingHandle(displayingObj);
    }

    function onPageChange(pageNum) {
      calcuDisplaying(items, pageNum);
    }

    return (
      <div>
        <div styleName="my-services-table">
          {servicesTableData.length > 10 && <div styleName="table-head">
            <div styleName="display">Displaying {displaying.start} - {displaying.end} of <span>{servicesTableData.length}</span> available drones:</div>
          </div>}
          {/* displaying end */}
          <Table
            id="myDronestable" data={servicesTableData}
            itemsPerPage={items.value}
            pageButtonLimit={4}
            sortable={['Drone Serial Number', 'Drone Name', 'Drone Type', 'Mileage']}
            onPageChange={onPageChange}
          />
          {/* table end */}

          {servicesTableData.length > 10 &&
            <div styleName="show-per-page">
              <span>Show</span>
              <div styleName="perPage-select">
                <Dropdown
                  options={options}
                  onChange={onChange}
                  value={items}
                  placeholder=""
                />
              </div>
              <span>per page</span>
            </div>
          }
          {/* show-per-page end */}
        </div>

      </div>
    );
  }
}


MyServicesTable.propTypes = {
  servicesTableData: PropTypes.array.isRequired,
  items: PropTypes.object.isRequired,
  itemPerPage: PropTypes.func.isRequired,
  displayingHandle: PropTypes.func.isRequired,
  displaying: PropTypes.object.isRequired,
};

export default CSSModules(MyServicesTable, styles);
