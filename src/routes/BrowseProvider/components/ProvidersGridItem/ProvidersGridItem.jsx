import React, {PropTypes} from 'react';
import CSSModules from 'react-css-modules';
import styles from './ProvidersGridItem.scss';
import ProvidersGridTooltips from '../ProvidersGridTooltips';

const getImage = (name) => `${window.location.origin}/img/drones/${name}`;

class ProvidersGridItem extends React.Component {
  constructor() {
    super();
    this.state = {
      isHidden: true,
    };
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden,
    });
  }

  render() {
    return (
      <div styleName="popular-drone-slider-item">
        { this.props.droneInfo.sponsored && <div styleName="sponsored">Sponsored</div> }
        <figure>
          <img src={getImage(this.props.droneInfo.imgSrc)} alt="drone picture" styleName="drone-img" />
          <figcaption>
            <div styleName="drone-name">
              <ProvidersGridTooltips droneInfo={this.props.droneInfo} />
              <div styleName="badge"><i styleName="icon-drone-badge" /></div>
            </div>
            <div styleName="job-rating">
              <p styleName="completed-job">Completed Job: {this.props.droneInfo.completedJob}</p>
              <div styleName="rating"><i styleName="icon-rating" /></div>
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }
}


ProvidersGridItem.propTypes = {
  droneInfo: PropTypes.object.isRequired,
};

export default CSSModules(ProvidersGridItem, styles);
