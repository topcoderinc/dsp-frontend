import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './DroneDetailsView.scss';
import DroneDetailBanner from './DroneDetailBanner';
import DroneInfoDetails from './DroneInfoDetails';
import DroneInfoSpecification from './DroneInfoSpecification';
import BrowseServices from './BrowseServices';
import Feedback from './Feedback';

/*
* DroneDetailsView
*/

export const DroneDetailsView = ({categories, feedbacks}) => (
  <div>
    <div styleName="drone-details-view">

      <DroneDetailBanner />
      <DroneInfoDetails />
      <DroneInfoSpecification />
      <BrowseServices categories={categories} />
      <Feedback feedbacks={feedbacks} />
    </div>
  </div>
);

DroneDetailsView.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CSSModules(DroneDetailsView, styles);
