import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import {connect} from 'react-redux';
import HeaderContainer from 'containers/HeaderContainer';
import Breadcrumbs from 'react-breadcrumbs';
import Footer from 'components/Footer';
import styles from './CoreLayout.scss';
import {userLocationUpdateAction} from '../../store/modules/global';
import _ from 'lodash';

const USER_LOCATION_KEY = 'ul';

class CoreLayout extends React.Component {

  constructor(props) {
    super(props);
    this.requestUserLocation = this.requestUserLocation.bind(this);
  }
  /**
   * React lifecycle method which is invoked after this component is mounted
   * This is invoked only on the page reload
   */
  componentDidMount() {
    // component did mount will be called on page reload, so if already a location is cached use that
    // and if not than request location from user
    this.requestUserLocation();
  }

  /**
   * Request a user location and fire redux action handler
   */
  requestUserLocation() {
    const {onUserLocationUpdate} = this.props;
    // don't request the permission everytime and use caching
    const cachedLocation = localStorage.getItem(USER_LOCATION_KEY);
    // just to be extra safe here as a user can manipulate the content of local storage
    if (cachedLocation && _.has(cachedLocation, 'lat') && _.has(cachedLocation, 'lng')) {
      onUserLocationUpdate(cachedLocation);
    } else if (_.hasIn(navigator, 'geolocation.getCurrentPosition')) {
      // request user location
      navigator.geolocation.getCurrentPosition((pos) => {
        onUserLocationUpdate({lat: pos.coords.latitude, lng: pos.coords.longitude});
      },
        null,
        {timeout: 60000}
      );
    }
  }

  render() {
    const {children, routes, params} = this.props;
    return (
      <div styleName="core-layout">
        <HeaderContainer routes={routes} />

        { (children.props.route.path !== 'home' && children.props.route.path !== 'browse-provider') &&
          <div className="breadcrumb-container">
            <Breadcrumbs routes={routes} params={params} excludes={['CoreLayout', 'ServiceRequest']} />
          </div> }


        <div styleName="content">
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}

CoreLayout.propTypes = {
  children: PropTypes.any.isRequired,
  routes: PropTypes.any.isRequired,
  params: PropTypes.any.isRequired,
  onUserLocationUpdate: PropTypes.func.isRequired,
};

const mapState = (state) => state.global;

const mapDispatchToProps = (dispatch) => ({
  onUserLocationUpdate: (location) => {
    dispatch(userLocationUpdateAction(location));
  },
});

export default connect(mapState, mapDispatchToProps)(CSSModules(CoreLayout, styles));
