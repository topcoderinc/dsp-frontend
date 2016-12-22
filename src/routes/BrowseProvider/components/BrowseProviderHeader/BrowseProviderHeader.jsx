import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import Dropdown from 'react-dropdown';
import styles from './BrowseProviderHeader.scss';

const options = [
  {value: 1, label: 'Popularity'},
  {value: 2, label: 'Rating'},
  {value: 3, label: 'Distance'},
  {value: 4, label: 'Name'},
];

const defaultOption = options[0];

export const BrowseProviderHeader = ({handleFilterToggle, toggleFilterValue}) => (
  <div styleName="browse-provider-header">
    <div styleName="search-filter-row">
      <div styleName="search-input">
        <i styleName="icon-grey-search" />
        <input type="search" placeholder="Type your keyword here..." />
      </div>

      <div styleName="filter">
        <a href="javascript:;" styleName="filter-btn" onClick={() => handleFilterToggle(!toggleFilterValue)}>
          {!toggleFilterValue && <span>Filter</span>}
          {!toggleFilterValue && <i styleName="icon-filter" />}
          {toggleFilterValue && <span>Cancel</span>}
        </a>
      </div>
    </div>

    {!toggleFilterValue && <div styleName="sort-row">
      <div styleName="near-by">242 Delivery Services Nearby Jakarta, Indonesia</div>
      <div styleName="sort-by-dropdown">
        <div styleName="selected-sort" className="selectSort">
          <span />
          <Dropdown
            options={options}
            value={defaultOption}
            placeholder=""
          />
        </div>
      </div>
    </div>}
  </div>
);

BrowseProviderHeader.propTypes = {
  handleFilterToggle: PropTypes.func,
  toggleFilterValue: PropTypes.bool,
};

export default CSSModules(BrowseProviderHeader, styles);
