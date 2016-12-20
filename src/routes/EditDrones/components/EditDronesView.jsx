import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './EditDronesView.scss';
import EditDronesHeader from './EditDronesHeader';
import EditDronesFormContainer from '../containers/EditDronesFormContainer';


/*
* EditDronesView
*/

export const EditDronesView = () => (
  <div>
    <EditDronesHeader />
    <div styleName="edit-drone-view">
      <EditDronesFormContainer />
    </div>
  </div>
);

EditDronesView.propTypes = {

};

export default CSSModules(EditDronesView, styles);
