import React from 'react';
import CSSModules from 'react-css-modules';
import _ from 'lodash';
import styles from './SearchInput.scss';

export const SearchInput = (props) => (
  <div styleName="search-input">
    <input {..._.omit(props, 'styles')} />
  </div>
);

SearchInput.propTypes = {

};

export default CSSModules(SearchInput, styles);
