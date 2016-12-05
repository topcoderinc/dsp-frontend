import React from 'react';
import CSSModules from 'react-css-modules';
import ReactSelect from 'react-select';
import _ from 'lodash';
import styles from './Select.scss';

export const Select = (props) => (
  <div styleName="select">
    <ReactSelect
      {..._.omit(props, 'styles')}
    />
  </div>
);

Select.defaultProps = {

};

export default CSSModules(Select, styles);
