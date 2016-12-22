import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './MyRequestFilter.scss';

export const MyRequestFilter = ({itemStartIndex, itemLastIndex, totalNumberOfItems, displayType, onPressFilter}) => (
  <div styleName="filter">
    <div styleName="display-info">
      Displaying {itemStartIndex} - {itemLastIndex} of {totalNumberOfItems} {displayType} requests:
    </div>
    <div styleName="filter-button" onClick={onPressFilter}>
      Filter
    </div>
  </div>
);

MyRequestFilter.propTypes = {
  itemStartIndex: PropTypes.number.isRequired,
  itemLastIndex: PropTypes.number.isRequired,
  totalNumberOfItems: PropTypes.number.isRequired,
  onPressFilter: PropTypes.func.isRequired,
  displayType: PropTypes.oneOf(['new/pending', 'scheduled', 'in progress', 'completed']),
};

export default CSSModules(MyRequestFilter, styles);
