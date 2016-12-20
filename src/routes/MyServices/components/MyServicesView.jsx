import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './MyServicesView.scss';
import MyServicesHeader from './MyServicesHeader';
import MyServicesTableContainer from '../containers/MyServicesTableContainer';


/*
* MyServicesView
*/

export const MyServicesView = () => (
  <div>
    <MyServicesHeader />

    <div styleName="my-services-view">
      <MyServicesTableContainer />
    </div>
  </div>
);

MyServicesView.propTypes = {

};

export default CSSModules(MyServicesView, styles);
