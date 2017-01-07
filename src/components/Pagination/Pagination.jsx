import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './Pagination.scss';
import ReactPaginate from 'react-paginate';

export const Pagination = ({forcePage, pageCount, onPageChange}) => {
  const props = {...{
    previousLabel: '',
    nextLabel: '',
    marginPagesDisplayed: 1,
    pageRangeDisplayed: 3,
    containerClassName: styles.pagination,
    pageClassName: styles.page,
    activeClassName: styles.page_active,
    breakClassName: styles.break,
    nextClassName: styles.next,
    previousClassName: styles.prev,
    disabledClassName: styles.disabled,
  },
    forcePage,
    pageCount,
    onPageChange,
  };

  return (<ReactPaginate {...props} />);
};

Pagination.propTypes = {
  forcePage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default CSSModules(Pagination, styles);
