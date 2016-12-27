import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './Pagination.scss';
import Select from '../Select';

const pageOptions = [
  { value: 10, label: '10' },
  { value: 30, label: '30' },
  { value: 50, label: '50' },
];


export const Pagination = ({ pages, activePageIndex }) => (
  <div styleName="pagination">
    <div styleName="show-per-page">
      <span>Show</span>
      <Select
        styleName="pagination-select"
        clearable={false}
        value={10}
        options={pageOptions}
        {..._.pick({}, 'value', 'onChange')}
      />
      <span>per page</span>
    </div>
    <ul styleName="pageControl">
      <li styleName="previousPage">&lt;</li>
      {_.range(pages).map((i) => (
        <li styleName={(activePageIndex || 0) === i ? 'active' : ''} key={i}>{i + 1}</li>
      ))}
      <li>...</li>
      <li styleName="nextPage">&gt;</li>
    </ul>
  </div>
);

Pagination.propTypes = {
  pages: PropTypes.number.isRequired,
  activePageIndex: PropTypes.number,
};

export default CSSModules(Pagination, styles);
