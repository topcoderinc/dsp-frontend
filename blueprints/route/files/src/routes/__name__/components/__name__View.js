import React, {PropTypes} from 'react';
import classes from './<%= pascalEntityName %>View.scss';

export const <%= pascalEntityName %>View = () => (
  <div className={classes.<%= camelEntityName %>View}>

  </div>
);

<%= pascalEntityName %>View.propTypes = {
  foo: PropTypes.string.isRequired,
};

export default <%= pascalEntityName %>View;
