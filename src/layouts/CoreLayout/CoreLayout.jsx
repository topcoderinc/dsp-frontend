import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import Breadcrumbs from 'react-breadcrumbs';
import HeaderContainer from 'containers/HeaderContainer';
import Footer from 'components/Footer';
import styles from './CoreLayout.scss';

export const CoreLayout = ({ children, routes, params }) => (
  <div styleName="core-layout">
    <HeaderContainer routes={routes} />
    <div className="breadcrumb-container">
      <Breadcrumbs routes={routes} params={params} excludes={['CoreLayout', 'ServiceRequest']} />
    </div>
    <div styleName="content">
      {children}
    </div>
    <Footer />
  </div>
);

CoreLayout.propTypes = {
  children: PropTypes.any.isRequired,
  routes: PropTypes.any.isRequired,
  params: PropTypes.any.isRequired,
};

export default CSSModules(CoreLayout, styles);
