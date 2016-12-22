import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './Location.scss';


/*
* Location
*/

export const Location = ({type, address}) => (
  <div styleName="location">
    <i styleName={`icon-${type}`} />
    <div styleName="text">
      {address.address}, <br />
      {address.city}, {address.state}, {address.zip}
    </div>
  </div>
);

Location.propTypes = {
  type: PropTypes.string.isRequired,
  address: PropTypes.object.isRequired,
};

export default CSSModules(Location, styles);
