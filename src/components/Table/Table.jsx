import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import ReactTable from 'react-table';
import styles from './Table.scss';
import SelectPerPage from 'components/SelectPerPage';
import Pagination from 'components/Pagination';
import _ from 'lodash';

/**
 * Populate column objects with id in class name
 * this way we can pass id to the on click handler inside ThComponent
 * @param  {Array}  columns original columns
 * @return {Array}          columns with id
 */
const prepareColumns = (columns) => (
  _.map(columns, (column) => (
    {...column, headerClassName: `-column-id-${column.accessor}`}
  ))
);

/**
 * Convert sorting parameter from backend format to ReactTable format
 * @param  {String} sortBy in backend format
 * @return {String}        in ReactTable format
 */
const prepareSorting = (sortBy) => {
  const sorting = [];

  sortBy && sorting.push({
    id: sortBy.replace(/^-/, ''),
    asc: sortBy[0] !== '-',
  });

  return sorting;
};

/*
  Table header cell component
  use custom component to implement server-side sorting
 */
const ThComponent = (props) => {
  const {className, onChange} = props;

  return (
    <th
      {..._.omit(props, 'toggleSort')}
      onClick={() => {
        const matchSortable = className.match(/(?:^| )-cursor-pointer(?: |$)/);
        if (matchSortable) {
          const matchColumnId = className.match(/(?:^| )-column-id-([^\s]+)(?: |$)/);
          const matchSortingDir = className.match(/(?:^| )-sort-([^\s]+)(?: |$)/);
          if (matchColumnId) {
            let sortDir;
            // if sorting direction is set and it's 'desc' we change it to 'asc'
            if (matchSortingDir && matchSortingDir[1] === 'desc') {
              sortDir = '';
            // if sorting direction is not set, then we set to 'asc' by default
            } else if (!matchSortingDir) {
              sortDir = '';
            // in this case sort direction was set to 'asc', so we change it to 'desc'
            } else {
              sortDir = '-';
            }
            onChange({sortBy: sortDir + matchColumnId[1]});
          }
        }
      }}
    >
      {props.children}
    </th>
  );
};

ThComponent.propTypes = {
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.any,
};

export const Table = ({columns, offset, limit, total, sortBy, onChange, ...props}) => (
  <div styleName="smart-table">
    <div styleName="table-wrap">
      <ReactTable
        tableClassName={styles.table}
        theadClassName={styles.thead}
        tbodyClassName={styles.tbody}
        trClassName={styles.tr}
        showPageJump={false}
        showPageSizeOptions={false}
        showPagination={false}
        loading={false}
        pages={Math.ceil(total / limit)}
        pageSize={limit}
        minRows={0}
        manual
        column={{
          sortable: false,
        }}
        sorting={prepareSorting(sortBy)}
        thComponent={(prop) => <ThComponent {...{...prop, onChange}} />}
        columns={prepareColumns(columns)}
        {...props}
      />
    </div>

    <div styleName="navigation">
      <div styleName="perpage">
        <SelectPerPage
          value={limit}
          onChange={({value}) => {
            // adjust page number (offset) when change per page quantity (limit)
            const newOffset = Math.floor(offset / value);
            onChange({limit: value, offset: newOffset});
          }}
        />
      </div>
      <div styleName="pagination">
        <Pagination
          forcePage={Math.ceil(offset / limit)}
          pageCount={Math.ceil(total / limit)}
          onPageChange={({selected}) => {
            onChange({offset: Math.ceil(selected * limit)});
          }}
        />
      </div>
    </div>

  </div>
);

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  offset: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  sortBy: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CSSModules(Table, styles);
