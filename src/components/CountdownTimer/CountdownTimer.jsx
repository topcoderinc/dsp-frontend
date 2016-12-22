import React from 'react';
import CSSModules from 'react-css-modules';
import Countdown from './Countdown';

import styles from './CountdownTimer.scss';

const CountdownTimer = () => {
  const OPTIONS = {endDate: '12/20/2016 12:12 AM', prefix: ''};

  return (
    <div>
      <Countdown options={OPTIONS} />
    </div>
  );
};

export default CSSModules(CountdownTimer, styles);
