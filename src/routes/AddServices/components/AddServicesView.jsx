import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './AddServicesView.scss';
import AddServicesHeader from './AddServicesHeader';
import AddServicesFormContainer from '../containers/AddServicesFormContainer';

/*
* Add Service View
*/

export const AddServicesView = () => (
  <div>
    <AddServicesHeader />
    <div styleName="add-services-view">
      <AddServicesFormContainer />
    </div>
  </div>
);

AddServicesView.propTypes = {

};

export default CSSModules(AddServicesView, styles);
