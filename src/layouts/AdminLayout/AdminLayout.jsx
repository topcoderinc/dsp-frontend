import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import AdminHeader from 'components/AdminHeader';
import Breadcrumbs from 'react-breadcrumbs';
import Footer from 'components/Footer';
import styles from './AdminLayout.scss';

export const AdminLayout = ({children, routes, params}) => (
  <div styleName="admin-layout">
    <AdminHeader />
    <div className="breadcrumb-container">
      <Breadcrumbs routes={routes} params={params} excludes={['CoreLayout', 'AdminLayout']} />
    </div>

    <div styleName="content">
      {children}
    </div>
    <Footer />
  </div>
);

AdminLayout.propTypes = {
  children: PropTypes.any.isRequired,
  routes: PropTypes.any.isRequired,
  params: PropTypes.any.isRequired,
};

export default CSSModules(AdminLayout, styles);
