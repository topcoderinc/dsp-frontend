import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './DroneInfoDetails.scss';

const getImage = (name) => `${window.location.origin}/img/drones/${name}`;

/*
* DroneInfoDetails
*/
export const DroneInfoDetails = () => (
  <div styleName="drone-info-details">
    <img src={getImage('drone-lg.png')} alt="drone picture" />
    <div styleName="drone-info">
      <h4>About Drone</h4>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.</p>
      <p>Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam; est usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum.</p>
    </div>
    {/* drone-info end */}
  </div>
);

DroneInfoDetails.propTypes = {
};

export default CSSModules(DroneInfoDetails, styles);
