
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import Countdown from './Countdown';

import styles from './CountdownTimer.scss';

class CountdownTimer extends Component {
  componentDidMount() {

  }
  render() {
    const OPTIONS = { endDate: '12/20/2016 12:12 AM', prefix: '' };

    return (
      <div>
        <Countdown options={OPTIONS} />
      </div>
    );
  }
}
export default CSSModules(CountdownTimer, styles);
