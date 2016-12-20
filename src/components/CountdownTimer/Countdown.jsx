import React, { Component, PropTypes} from 'react';
import DateBetween from './DateBetween';

/**
 * Count down module
 * A simple count down component.
**/
export default class Countdown extends Component {

  constructor(props) {
    super(props);
    this.state = { remaining: null };
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const startDate = new Date();
    const endDate = new Date(this.props.options.endDate);
    const remaining = DateBetween(startDate, endDate);
    this.setState({remaining });
  }

  render() {
    return (
      <div className="react-count-down">
        <span className="date"> {this.state.remaining}</span>
        <span className="prefix"> {this.props.options.prefix}</span>
      </div>
    );
  }
}

Countdown.propTypes = {
  options: PropTypes.object.isRequired,
};
