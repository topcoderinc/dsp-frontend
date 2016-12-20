import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import { Link } from 'react-router';
import styles from './HomeBanner.scss';
import Button from 'components/Button';

export const HomeBanner = ({}) => (
  <div styleName="home-banner">
    <div styleName="banner-bg">
      <h2>GET THINGS DONE BY DRONE</h2>
      <p>Browse hundreds of drone services from professional to help get your things done</p>
      <div styleName="services-btns">
        <Link to="browse-provider"><Button color="blue" className={styles.provideBtn}>Browse Drone Services</Button></Link>
        <Button color="silver" className={styles.provideBtn}>Provide Drone Services</Button>
      </div>
      <div styleName="filmed-by">
        <i styleName="icon-filmed-by" />
        <p>Filmed by Drone Maniac #1 in Los Angeles, CA</p>
      </div>
    </div>
  </div>
);

HomeBanner.propTypes = {
};

export default CSSModules(HomeBanner, styles);
