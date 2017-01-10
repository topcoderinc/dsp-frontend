import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import cn from 'classnames';
import styles from './Location.scss';


/*
* Location
*/

export const Location = ({type, address, clearAddress, selectAddress, error}) => (
  <div styleName="location">
    <i styleName={cn({'icon-red': type === 'start', 'icon-green': type === 'end'})} />
    {
      address ?
      (<div styleName="text">
        {`lng: ${address.coor.lng()}, lat:${address.coor.lat()}`}
      </div>) :
      (
        <div styleName={cn({hint: true, error})} onClick={() => selectAddress(type)}>Click here to select {type === 'start' ? 'starting' : 'target'} location</div>
      )
    }
    {
      address ? (<span styleName="clear" onClick={clearAddress}>X</span>) : null
    }
  </div>
);

Location.propTypes = {
  type: PropTypes.string.isRequired,
  address: PropTypes.object,
  clearAddress: PropTypes.func.isRequired,
  selectAddress: PropTypes.func.isRequired,
  error: PropTypes.bool,
};

export default CSSModules(Location, styles, {allowMultiple: true});
