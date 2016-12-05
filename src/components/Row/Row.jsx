import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Row.scss';

export const Row = ({children}) => (
  <div styleName="row">
    {children.map((item, i) => <div key={i} styleName="col" style={{width: `${100 / children.length}%`}}>{item}</div>)}
  </div>
);

Row.propTypes = {
  children: PropTypes.any.isRequired,
};

export default CSSModules(Row, styles);
