import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './HowItWorks.scss';
import Button from 'components/Button';

export const HowItWorks = ({}) => (
  <div styleName="how-it-works">
    <div styleName="how-it-works-bg">
      <h2>How it Works</h2>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt
        ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
        tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
        iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat
        nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit </p>
      <a href="javascript:;" styleName="play-video"><i styleName="icon-play-video" />Play Video</a>
    </div>
  </div>
);

HowItWorks.propTypes = {
};

export default CSSModules(HowItWorks, styles);
