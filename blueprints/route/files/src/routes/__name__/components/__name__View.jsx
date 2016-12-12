import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './<%= pascalEntityName %>View.scss';

export const <%= pascalEntityName %>View = () => (
  <div styleName="<%= dashesEntityName %>-view">
    <%= pascalEntityName %>View
  </div>
);

<%= pascalEntityName %>View.propTypes = {
  // foo: PropTypes.string.isRequired,
};

export default CSSModules(<%= pascalEntityName %>View, styles);
