import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import enhanceWithClickOutside from 'react-click-outside';
import styles from './ProvidersGridTooltips.scss';

const getImage = (name) => `${window.location.origin}/img/drones/${name}`;

class ProvidersGridTooltips extends React.Component {
  componentDidMount() {
    const { droneInfo } = this.props;
  }
  constructor() {
    super();
    this.state = {
      isHidden: true,
    };
  }
  handleClickOutside() {
    this.setState({ isHidden: true });
  }
  toggleHidden() {
    this.setState({
      isHidden: this.state.isHidden ? false : true,
    });
  }

  render() {
    return (
      <div>
        <span>{this.props.droneInfo.droneName}</span>
        <div styleName="infowindow-container">
          <a
            href="javascript:;" className={this.state.isHidden ? 'infoIconBlack' : 'infoIconOrange'}
            onClick={::this.toggleHidden}
          />
          <div styleName="infowindowContent" className={this.state.isHidden ? styles.hideDetail : styles.showDetail}>
            <div>
              <p>Status: <span styleName="available">Available</span></p>
              <p>Distance: <span>500 mts</span></p>
              <p>Rate per mile: <span>$ 10.00</span></p>
              <div className={styles.viewDetailBtn}><a href="javascript:;">View Detail &gt;</a></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


ProvidersGridTooltips.propTypes = {
  droneInfo: PropTypes.object.isRequired,
};

export default enhanceWithClickOutside(CSSModules(ProvidersGridTooltips, styles));
