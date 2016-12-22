import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './HomeView.scss';
import HomeBanner from '../components/HomeBanner';
import PopularDronesSlides from '../components/PopularDronesSlides';
import PromotedService from '../components/PromotedService';
import BrowseServices from '../components/BrowseServices';
import TopDrones from '../components/TopDrones';
import HowItWorks from '../components/HowItWorks';
import LastCompletedMissions from '../components/LastCompletedMissions';


export const HomeView = ({popularDrones, promotedServices, categories, lastCompletedMissionsData}) => (
  <div styleName="home-view">
    <HomeBanner />

    <PopularDronesSlides popularDrones={popularDrones} />

    <PromotedService promotedServices={promotedServices} />

    <TopDrones popularDrones={popularDrones} />

    <BrowseServices categories={categories} />

    <HowItWorks />

    <LastCompletedMissions lastCompletedMissionsData={lastCompletedMissionsData} />

  </div>
);

HomeView.propTypes = {
  popularDrones: PropTypes.array.isRequired,
  promotedServices: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  lastCompletedMissionsData: PropTypes.object.isRequired,
};

export default CSSModules(HomeView, styles);
